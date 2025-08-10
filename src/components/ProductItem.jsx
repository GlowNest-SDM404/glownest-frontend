import React, { useEffect, useState } from "react";
import "../styles/ProductItem.css";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentJwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${import.meta.env.VITE_SERVER_URL}/products`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div>Failed to load products: {error}</div>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <article key={product._id} className="product-item">
          <img
            className="product-item-image"
            src={product.imageUrl}
            alt={product.productName}
          />
          <h3 className="product-item-name">{product.productName}</h3>
          <p className="product-item-brand">{product.brand}</p>
          <p className="product-item-price">${product.price}</p>
        </article>
      ))}
    </div>
  );
}
