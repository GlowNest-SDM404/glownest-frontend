import React, { useEffect, useState } from "react";
import "../styles/ProductItem.css";

export default function ProductsGrid({
  products: incomingProducts, // optional: array of products to render
  loading: incomingLoading = false,
  error: incomingError = "",
}) {
  const [products, setProducts] = useState(incomingProducts || []);
  const [loading, setLoading] = useState(incomingLoading || !incomingProducts);
  const [error, setError] = useState(incomingError || "");

  const currentJwt = localStorage.getItem("jwt");

  // If parent passes products, just render them.
  useEffect(() => {
    if (incomingProducts) {
      setProducts(incomingProducts);
      setLoading(incomingLoading);
      setError(incomingError);
      return;
    }

    // Otherwise, fetch all products (fallback behavior for pages like Home)
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const url = `${import.meta.env.VITE_SERVER_URL}/products`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [incomingProducts, incomingLoading, incomingError, currentJwt]);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div>Failed to load products: {error}</div>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <article key={product._id} className="product-item">
          <span
            className={`product-stock-label ${
              product.isAvailable ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </span>

          <img
            className="product-item-image"
            src={product.imageUrl}
            alt={product.productName}
          />
          <h3 className="product-item-name">{product.productName}</h3>
          <p className="product-item-brand">{product.brand}</p>
          <p className="product-item-price">${product.price}</p>
          <button className="add-to-cart-btn" disabled={!product.isAvailable}>
            {product.isAvailable ? "Add to Cart" : "Unavailable"}
          </button>
        </article>
      ))}
    </div>
  );
}
