import React, { useEffect, useState } from "react";
import "../styles/ProductItem.css";

import toast, { Toaster } from "react-hot-toast";

import ErrorMessage from "./ErrorMessage";
import AnimatedLoader from "./Loaders/AnimatedLoader";

import { useCart } from "../contexts/CartContext";

export default function ProductsGrid({
  products: incomingProducts,
  loading: incomingLoading = false,
  error: incomingError = "",
}) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(incomingProducts || []);
  const [loading, setLoading] = useState(incomingLoading || !incomingProducts);
  const [error, setError] = useState(incomingError || "");

  const currentJwt = localStorage.getItem("jwt");
  const notify = () => toast.success("Successfully Added to Cart!");

  useEffect(() => {
    if (incomingProducts) {
      setProducts(incomingProducts);
      setLoading(incomingLoading);
      setError(incomingError);
      return;
    }

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

  if (loading) {
    // Show a loading state while fetching data
    return (
      <div>
        Loading products…
        <AnimatedLoader />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{ duration: 2000, style: { boxShadow: "none" } }}
      />

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
            <div className="product-btns">
              <button
                className="add-to-cart-btn"
                disabled={!product.isAvailable}
                onClick={() => {
                  addToCart(product);
                  notify();
                }}
              >
                {product.isAvailable ? "Add to Cart" : "Unavailable"}
              </button>
              <button className="add-to-wishlist-btn">
                <i className={"bi bi-heart"}></i>
                {/* <i
                className={
                  isInCart(product._id) ? "bi bi-heart-fill" : "bi bi-heart"
                }
              ></i> */}
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
