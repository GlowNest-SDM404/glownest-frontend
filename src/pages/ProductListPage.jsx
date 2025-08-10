import { useEffect, useMemo, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/Filters.css";
import "../styles/ProductItem.css";

export default function ProductListPage() {
  const [filters, setFilters] = useState({
    q: "",
    category: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    gender: [],
    skin: [],
    tags: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentJwt = localStorage.getItem("jwt");

  // Create a stable query string whenever filters change
  const queryString = useMemo(() => {
    const p = new URLSearchParams();

    if (filters.q) p.set("q", filters.q);
    if (filters.category.length) p.set("category", filters.category.join(","));
    if (filters.brands.length) p.set("brands", filters.brands.join(","));
    if (filters.minPrice) p.set("minPrice", filters.minPrice);
    if (filters.maxPrice) p.set("maxPrice", filters.maxPrice);
    if (filters.gender.length) p.set("gender", filters.gender.join(","));
    if (filters.skin.length) p.set("skin", filters.skin.join(","));
    if (filters.tags.length) p.set("tags", filters.tags.join(","));

    return p.toString();
  }, [filters]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const url = `${import.meta.env.VITE_SERVER_URL}/products${
          queryString ? `?${queryString}` : ""
        }`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        });
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        if (!ignore) setProducts(data);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [queryString, currentJwt]);

  return (
    <div className="product-list">
      <h2 className="section-title">Product List</h2>

      <div className="products-layout">
        <FilterSidebar value={filters} onChange={setFilters} />

        <main>
          {loading && products.length === 0 && <div>Loading products…</div>}
          {error && products.length === 0 && (
            <div>Failed to load products: {error}</div>
          )}

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

          {!loading && !error && products.length === 0 && (
            <p style={{ marginTop: "1rem" }}>
              No products match these filters.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
