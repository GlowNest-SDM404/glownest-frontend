import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function InnerPayment({ buildOrderPayload, BASE, authHeaders }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const pay = async () => {
    if (!stripe || !elements) return;
    setMessage("");
    setSubmitting(true);

    try {
      const payload = buildOrderPayload?.();
      if (!payload) {
        throw new Error("Please complete shipping details before paying.");
      }

      const create = await fetch(`${BASE}/orders`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(payload),
      });

      const order = await create.json();
      if (!create.ok) throw new Error(order.message || "Order creation failed");

      const piRes = await fetch(`${BASE}/orders/${order._id}/payment-intent`, {
        method: "POST",
        headers: authHeaders,
      });

      const { clientSecret, intentId, message: piErr } = await piRes.json();
      if (!piRes.ok) throw new Error(piErr || "Failed to start payment");

      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card },
        }
      );
      if (error) throw new Error(error.message || "Card was declined");

      if (paymentIntent.status !== "succeeded") {
        throw new Error(`Payment ${paymentIntent.status}`);
      }

      const mark = await fetch(`${BASE}/orders/${order._id}/mark-paid`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ paymentIntentId: intentId || paymentIntent.id }),
      });
      const updated = await mark.json();
      if (!mark.ok)
        throw new Error(updated.message || "Could not finalize order");

      try {
        await clearCart();
      } catch {}
      sessionStorage.setItem("justPlacedOrder", "1");
      navigate(`/order-confirmation/${updated._id}`);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card p-3">
      <h5 className="mb-2">Payment</h5>
      <CardElement options={{ hidePostalCode: true }} />
      {message && <div className="alert alert-danger mt-3">{message}</div>}
      <button
        className="btn btn-success mt-3"
        onClick={pay}
        disabled={submitting || !stripe}
      >
        {submitting ? "Processing…" : "Pay now"}
      </button>
      <div className="text-muted small mt-2">
        Use Stripe test cards e.g. <code>4242 4242 4242 4242</code>, any future
        date, any CVC.
      </div>
    </div>
  );
}

export default function CheckoutPayment({
  buildOrderPayload,
  BASE,
  authHeaders,
}) {
  const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = useMemo(() => (pk ? loadStripe(pk) : null), [pk]);
  if (!pk)
    return <div className="alert alert-warning">Missing Stripe key.</div>;

  const stripeOptions = useMemo(() => ({}), []);
  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <InnerPayment
        buildOrderPayload={buildOrderPayload}
        BASE={BASE}
        authHeaders={authHeaders}
      />
    </Elements>
  );
}
