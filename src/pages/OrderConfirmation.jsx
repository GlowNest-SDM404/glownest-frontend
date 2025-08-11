import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/OrderConfirmation.css";

import cream from '../assets/img/cream_sub_1.png';
import mist from '../assets/img/rose_water.png';

export default function OrderConfirmation() {
  // Fetch specific order details based on orderId from URL
  // GET http://localhost:PORT/orders/:orderId (auth required)
  // ----------------------------------
  // ----------------------------------
  // Expected response:
  // {
  //   number, deliveryDate,
  //   items: [{ productId, name, image, price, qty }],
  //   subtotal, shipping, tax, total,
  //   shippingAddress, paymentMethod
  // }

  const [user, setUser] = useState({ firstName: "John" });
  const [order, setOrder] = useState({
    number: "GN-987654321",
    deliveryDate: "Sunday, August 10, 2025",
    items: [
      {
        productId: "1",
        name: "Ultra Hydrating Cream",
        image: cream,
        price: 50.00,
        qty: 2,
      },
      { productId: "2",
        name: "Rose Water Hydrating Mist",
        image: mist,
        price: 25.00,
        qty: 1,
      },
    ],
    subtotal: 125.00,
    shipping: 0,
    tax: 10.16,
    total: 135.16,
    shippingAddress: "196 Flinders St, Melbourne VIC 3000",
    paymentMethod: "Visa ending in 4242",
  });

  // Simulate cart CRUD operations
  // POST => Add new product to cart [http://localhost:PORT/cart/create (requires JWT auth)]
  // {
  //   productId: string,
  //   qty: number
  // }
  // If product already exists in cart, this may:
  //  - Replace the quantity (if your backend supports upsert)
  //  - Or return a conflict and require a PUT instead
  // ----------------------------------
  // PUT => Update existing item [http://localhost:PORT/cart/update/:productId (requires JWT auth)]
  // {
  //   productId: string,
  //   qty: number
  // }
  // ----------------------------------
  // DELETE => Remove item from cart [http://localhost:PORT/cart/delete/:productId (requires JWT auth)]
  // Body or URL param should contain productId

  return (
      <div className="order-confirm-page container">
          <div className="confirmation-card">
              <div className="check-container">
                  <div className="check-icon">✓</div>
              </div>
              <h2>Order Confirmed!</h2>
              <p className="message">Thank you, <strong>{user?.firstName || "Customer"}</strong>.</p>
              <p>Order Number: <strong>{order.number}</strong></p>
              <p>Estimated Delivery: <strong>{order.deliveryDate}</strong></p>
              <hr />

              <h4 className="mt-4 text-left">Order Summary</h4>
              {order.items.map((item) => (
              <div key={item.productId} className="order-item d-flex align-items-center">
                  <img src={item.image} alt={item.name} className="order-img" />
                  <div className="ms-2">
                  <div>{item.name}</div>
                  <div className="qty-text">Qty: {item.qty}</div>
                  </div>
                  <div className="ms-auto">${(item.price * item.qty).toFixed(2)}</div>
              </div>
              ))}

              <div className="d-flex justify-content-between summary-lines">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between summary-lines">
              <span>Shipping:</span>
              <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between summary-lines">
              <span>Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between total-line">
              <strong>Total:</strong>
              <strong>${order.total.toFixed(2)}</strong>
              </div>
              <hr />

              <h5 className="mt-4 delivery-payment text-left">Delivery & Payment</h5>
              <p className="text-left"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              <p className="text-left"><strong>Payment Method:</strong> {order.paymentMethod}</p>

              <div className="conf-buttons">
                  <Link to="/" className="btn btn-primary continue-shopping-btn">Continue Shopping</Link>
                  <Link to="#" className="btn btn-outline-primary view-order-details-btn">View Order Details</Link>
              </div>
          </div>
      </div>
  );
}