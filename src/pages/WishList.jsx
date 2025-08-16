import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Wishlist.css";

import cream from '../assets/img/cream_sub_1.png';
import mist from '../assets/img/rose_water.png';

export default function Wishlist() {
  // Fetch user's wishlist items and product recommendations
  // GET http://localhost:PORT/wishlist (auth required)
  // GET http://localhost:PORT/products/recommendations (optional, may not require auth)

  // Wishlist response format (Same for recommendations):
  // [
  //   { id, name, image, price, category, inStock }
  // ]

  const [wishlist, setWishlist] = useState([{
    id: 1,
    name: "Ultimate Hydrating Cream",
    category: "Cream",
    price: 50.00,
    image: cream,
    inStock: true
  }]);
  const [recommendations, setRecommendations] = useState([{
    id: 2,
    name: "Rose Water Hydrating Mist",
    category: "Mist",
    price: 25.00,
    image: mist,
    inStock: true
  }]);

  const moveAllToCart = () => {
    // To move item to cart:
    // POST http://localhost:PORT/cart
    // Body: { productId, qty }
    // Header: Authorization: Bearer <token>
  };

  const clearWishlist = () => {
    // To clear wishlist:
    // DELETE http://localhost:PORT/wishlist
    setWishlist([]);
  };

  const removeItem = (id) => {
    // To remove single item:
    // DELETE http://localhost:PORT/wishlist/:productId
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container wishlist-page">
      <h3>Your Wishlist ({wishlist.length} item{wishlist.length !== 1 ? "s" : ""})</h3>
      <div className="wishlist-items">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-card card">
            {item.inStock && <span className="badge bg-success in-stock">In Stock</span>}
            <img src={item.image} alt={item.name} className="card-img-top"/>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.category}</p>
              <p className="card-price">${item.price.toFixed(2)}</p>
              <button className="btn btn-primary move-btn">Move to Cart</button>
              <button className="btn btn-link remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {wishlist.length > 0 && (
        <div className="wishlist-actions">
          <button className="btn btn-outline-primary" onClick={moveAllToCart}>Move All to Cart</button>
          <button className="btn btn-link text-danger" onClick={clearWishlist}>Clear Wishlist</button>
        </div>
      )}

      <h4 className="mt-5">You Might Also Like</h4>
      <div className="recommendations">
        {recommendations.map((item) => (
          <div key={item.id} className="rec-card card">
            <img src={item.image} alt={item.name} className="card-img-top"/>
            <div className="card-body">
              <h6 className="card-title">{item.name}</h6>
              <p className="card-price">${item.price.toFixed(2)}</p>
              <Link to={`/products/${item.id}`} className="btn btn-outline-primary view-btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}