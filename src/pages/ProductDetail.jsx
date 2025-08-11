import { useState } from 'react';

import "../styles/ProductDetail.css";

import cream_1 from '../assets/img/cream_sub_1.png';
import cream_2 from '../assets/img/cream_sub_2.png';
import cream_3 from '../assets/img/cream_sub_3.png';
import cream_4 from '../assets/img/cream_sub_4.png';

export default function ProductDetail() {
  // Fetch product details from backend when component mounts or when product ID changes
  // GET http://localhost:PORT/products/:id
  // No authorization required if product data is public

  // Expected response — With example below:
  // {
  //   name, price, description, shortDescription,
  //   ingredients, howToUse, benefits,
  //   image, images[list of thumbnails], rating, reviews[list of customer reviews]
  // }

  const [product, setProduct] = useState({
    name: 'Ultimate Hydration Cream',
    images: [cream_1, cream_2, cream_3, cream_4],
    price: 50.00,
    rating: 4.6,
    reviews: [{
      name: 'Alice',
      rating: 5,
      comment: 'This cream is amazing! My skin feels so hydrated and soft.',
      date: '10 days ago',
    }, {
      name: 'Bob',
      rating: 4,
      comment: 'Great product, but a bit pricey.',
      date: '8 months ago',
    }, {
      name: 'Charlie',
      rating: 4.5,
      comment: 'I love the texture and how it absorbs quickly.',
      date: 'August 24, 2024',
    }],
    description: 'The Ultimate Hydration Cream is a luxurious, dermatologist-tested formula designed to quench even the thirstiest skin. Its unique blend of advanced hydrators and skin-identical lipids works synergistically to deliver deep, lasting moisture, immediately making your skin feel smoother and more comfortable. This rich yet non-greasy cream forms an invisible shield against environmental stressors, locking in essential moisture throughout the day and night.',
    shortDescription: 'A delicate, refreshing mist infused with pure rose water, designed to hydrate, soothe, and balance the skin. Ideal for all skin types, it can be used as a toner, makeup setting spray, or a quick pick-me-up throughout the day.',
    ingredients: 'A rich formula containing shea butter, ceramides, squalane, and niacinamide to deeply nourish and repair skin barrier.',
    howToUse: 'Apply generously to face and neck after cleansing and toning. Use daily, especially in dry or cold weather.',
    benefits: 'Provides long-lasting hydration, restores skin barrier, reduces fine lines, and enhances skin smoothness and glow.',
  });
  const [selectedImage, setSelectedImage] = useState(cream_1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const handleQuantity = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="product-detail-container container">
      {/* Top Product Section */}
      <div className="product-top">
        <div className="product-images">
          <img
            src={selectedImage}
            alt={product.name}
            className="product-main-img"
          />
          <div className="product-thumbnails">
            {(product.images || []).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="product-thumbnail-img"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <div className="product-price">${product.price.toFixed(2)} AUD</div>
          <div className="product-rating">
            ★ {product.rating?.toFixed(1)} ({product.reviews?.length || 0} reviews)
          </div>
          <div className="product-description">{product.shortDescription}</div>

          {/* Quantity & Cart */}
          <div className="quantity-wrapper">
            <button className="btn btn-outline-secondary" onClick={() => handleQuantity(-1)}>
              −
            </button>
            <span>{quantity}</span>
            <button className="btn btn-outline-secondary" onClick={() => handleQuantity(1)}>
              +
            </button>
            <button className="btn add-to-cart-btn ms-3">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <ul className="nav nav-tabs product-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "ingredients" ? "active" : ""}`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "howToUse" ? "active" : ""}`}
            onClick={() => setActiveTab("howToUse")}
          >
            How to Use
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "benefits" ? "active" : ""}`}
            onClick={() => setActiveTab("benefits")}
          >
            Key Benefits
          </button>
        </li>
      </ul>

      <div className="product-tab-content">
        {activeTab === "description" && <p>{product.description}</p>}
        {activeTab === "ingredients" && <p>{product.ingredients}</p>}
        {activeTab === "howToUse" && <p>{product.howToUse}</p>}
        {activeTab === "benefits" && <p>{product.benefits}</p>}
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-title">Customer Reviews</div>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="row">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="col-md-4">
                <div className="review-card">
                  <div className="review-name">{review.name}</div>
                  <div className="text-warning">★ {review.rating}</div>
                  <div className="review-text">{review.comment}</div>
                  <div className="review-date">{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
        <button className="btn btn-link mt-3">Write a Review</button>
      </div>
    </div>
  );
};