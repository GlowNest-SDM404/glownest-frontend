import { useState, useEffect } from "react";
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
    cartItems: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    // how should shipping be charged?
    const shipping = 0; 
    const tax = parseFloat((subtotal * 0.1).toFixed(2)); 

    setCheckoutData({
      cartItems: cart.map((item) => ({
        productId: item.productId,
        name: item.productName,
        image: item.imageUrl,
        price: item.price,
        qty: item.quantity,
      })),
      subtotal,
      shipping,
      tax,
    });
  }, []);

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;

    const updated = [...checkoutData.cartItems];
    updated[index].qty = newQty;

    const subtotal = updated.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const tax = parseFloat((subtotal * 0.1).toFixed(2)); // recalculate tax

    setCheckoutData({
      ...checkoutData,
      cartItems: updated,
      subtotal,
      tax,
    });

    // Save back to localStorage
    const saved = updated.map((item) => ({
      productId: item.productId,
      productName: item.name,
      imageUrl: item.image,
      price: item.price,
      quantity: item.qty,
    }));
    localStorage.setItem("cart", JSON.stringify(saved));
  };

  const removeItem = (index) => {
    const updated = [...checkoutData.cartItems];
    updated.splice(index, 1);

    const subtotal = updated.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const tax = parseFloat((subtotal * 0.1).toFixed(2));

    setCheckoutData({
      ...checkoutData,
      cartItems: updated,
      subtotal,
      tax,
    });

    // update localStorage
    const saved = updated.map((item) => ({
      productId: item.productId,
      productName: item.name,
      imageUrl: item.image,
      price: item.price,
      quantity: item.qty,
    }));
    localStorage.setItem("cart", JSON.stringify(saved));
  };

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
            {checkoutData.cartItems.map((item, index) => (
              <div key={item.productId} className="card mb-4 p-3 shadow-sm">
                <div className="text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid mb-2"
                    style={{ maxWidth: "120px" }}
                  />
                  <h5 className="fw-bold">{item.name}</h5>
                </div>

                <button
                  className="btn position-absolute top-0 end-0 m-2 p-1"
                  onClick={() => removeItem(index)}
                  title="Remove from cart"
                >
                  <i
                    className="bi bi-trash"
                    style={{ color: "#dc3545", fontSize: "1.2rem" }}
                  ></i>
                </button>

                <div className="text-center mt-3">
                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <button
                      className="btn-qty"
                      onClick={() => updateQuantity(index, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      –
                    </button>
                    <span style={{ minWidth: "2rem", textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button
                      className="btn-qty"
                      onClick={() => updateQuantity(index, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <small className="text-muted">
                      ${item.price.toFixed(2)} × {item.qty}
                    </small>
                    <div className="fw-bold fs-5">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
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
