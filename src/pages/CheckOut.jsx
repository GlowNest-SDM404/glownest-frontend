import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/CheckOut.css";

export default function CheckOut() {
  // Fetch checkout data including cart items and calculated totals
  // GET http://localhost:PORT/checkout (auth required)

  // Expected response:
  // {
  //   cartItems: [{ productId, name, image, price, qty }],
  //   subtotal: number, (could be calculated from frontEnd or backEnd)
  //   shipping: number,
  //   tax: number
  // }

  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({
    cartItems: [
    // *pull from database or mock data *
    
    //   {
    //     productId: 1,
    //     name: "Ultimate Hydrating Cream",
    //     image: cream,
    //     price: 50.0,
    //     qty: 1,
    //   },
    //   {
    //     productId: 2,
    //     name: "Rose Water Hydrating Mist",
    //     image: mist,
    //     price: 25.0,
    //     qty: 2,
    //   },
    ],
    subtotal: 125.0,
    shipping: 0,
    tax: 10.16,
  });
  const [step, setStep] = useState(1);
  const orderTotal =
    checkoutData.subtotal + checkoutData.shipping + checkoutData.tax;

  const handlePlaceOrder = () => {
    // To place order:
    // POST http://localhost:PORT/orders
    // Body: { shippingInfo, paymentInfo }
    // Header: Authorization: Bearer <token>
    navigate("/order-confirmation");
  };

  return (
    <div className="checkout-page container">
      {/* Progress Bar */}
      <ul className="checkout-steps">
        <li className={step === 1 ? "active" : step > 1 ? "completed" : ""}>
          Cart Summary
        </li>
        <li className={step === 2 ? "active" : step > 2 ? "completed" : ""}>
          Shipping Information
        </li>
        <li className={step === 3 ? "active" : ""}>Payment Details</li>
      </ul>

      <div className="row mt-4">
        {/* Cart Summary */}
        <div className="col-md-8">
          <div className="section">
            <h4>Cart Summary</h4>
            {checkoutData.cartItems.map((item) => (
              <div key={item.productId} className="cart-item row">
                <div className="col-3">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="col-7">
                  <strong>{item.name}</strong>
                  <div>
                    <span className="text">
                      ${item.price.toFixed(2)} × {item.qty}
                    </span>
                  </div>
                </div>
                <div className="col-2 text-end">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
            <button
              className="btn btn-primary continue-btn mt-3 shipping-btn"
              onClick={() => setStep(2)}
            >
              Continue to Shipping
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>

          {/* Shipping Accordion */}
          <div className="section">
            <button className="accordion-header" onClick={() => setStep(2)}>
              Shipping Information
            </button>
            {step === 2 && (
              <div className="accordion-body">
                {/* form fields */}
                <form> {/* Add shipping fields here */} </form>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => setStep(3)}
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </div>

          {/* Payment Accordion */}
          <div className="section">
            <button className="accordion-header" onClick={() => setStep(3)}>
              Payment Details
            </button>
            {step === 3 && (
              <div className="accordion-body">
                {/* form fields */}
                <form> {/* Add payment fields (e.g. card info) here */} </form>
                <button className="btn btn-success mt-2">Place Order</button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-md-4">
          <div className="order-summary card p-3">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between">
              <strong>Subtotal</strong>
              <strong>${checkoutData.subtotal.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Shipping</strong>
              <strong>${checkoutData.shipping.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Estimated Tax</strong>
              <strong>${checkoutData.tax.toFixed(2)}</strong>
            </div>
            <hr />
            <div className="total d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${orderTotal.toFixed(2)}</strong>
            </div>
            <button
              className="btn btn-primary continue-btn mt-3 place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
            <span className="term-text">
              By placing your order, you agree to GlowNest's Terms of Service.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
