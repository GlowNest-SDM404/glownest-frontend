import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "../styles/ProductItem.css";
import "../styles/WishList.css";

import { useCart } from "../contexts/CartContext";

export default function WishList() {
  const { addToCart } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(() => new Set());
  const [adding, setAdding] = useState(() => new Set());

  const apiBase = import.meta.env.VITE_SERVER_URL;
  const currentJwt = localStorage.getItem("jwt");

  const notifyClearWishlist = () => toast.success("Wishlist cleared!");
  const notifyRemoved = (name) =>
    toast.success(`${name} removed from wishlist`);
  const notifyCart = (name) => toast.success(`${name} added to cart!`);
  const notifyError = (m) => toast.error(m || "Something went wrong");

  // Load wishlist as full Product objects
  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!currentJwt) return;
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/wishlist`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        });
        if (!res.ok) throw new Error("Failed to load wishlist");
        const products = await res.json();
        if (!ignore) setItems(Array.isArray(products) ? products : []);
      } catch (e) {
        if (!ignore) notifyError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [apiBase, currentJwt]);

  const removeOne = async (id, name = "") => {
    if (!currentJwt) {
      notifyError("Please sign in to manage your wishlist");
      return;
    }
    if (pending.has(id)) return;
    setPending((p) => new Set(p).add(id));
    try {
      const res = await fetch(`${apiBase}/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentJwt}`,
        },
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setItems((prev) => prev.filter((p) => (p._id || p.id) !== id));
      notifyRemoved(name);
    } catch (e) {
      notifyError(e.message);
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(id);
        return next;
      });
    }
  };

  const clearAll = async () => {
    if (!currentJwt) {
      notifyError("Please sign in to manage your wishlist");
      return;
    }
    try {
      // backend supports DELETE /wishlist/:id; fire them all
      await fetch(`${apiBase}/wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentJwt}`,
        },
      });

      setItems([]);
      notifyClearWishlist();
    } catch (e) {
      notifyError(e.message);
    }
  };

  const handleAddToCart = async (product) => {
    if (!product?.isAvailable) return;
    if (!currentJwt) {
      notifyError("Please sign in to add items to your cart");
      return;
    }
    const id = product._id || product.id;
    if (adding.has(id)) return;

    setAdding((prev) => new Set(prev).add(id));
    try {
      await addToCart(product);
      notifyCart(product.productName);
    } catch (e) {
      notifyError(e?.message || "Failed to add to cart");
    } finally {
      setAdding((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const moveAllToCart = async () => {
    for (const p of items) {
      // add one by one; ignore failures per item
      try {
        await addToCart(p);
      } catch {}
    }
    toast.success("All items added to cart!");
  };

  if (loading) {
    return (
      <div className="container wishlist-page">
        <Toaster
          position="bottom-center"
          toastOptions={{ duration: 2000, style: { boxShadow: "none" } }}
        />
        <h3>Your Wishlist</h3>
        <div>Loading wishlist…</div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{ duration: 2000, style: { boxShadow: "none" } }}
      />

      <div className="container wishlist-page">
        <h3>
          Your Wishlist ({items.length} item{items.length !== 1 ? "s" : ""})
        </h3>

        {items.length === 0 ? (
          <div>
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <>
            {/* Use the same as product cards */}
            <div className="products-grid">
              {items.map((product) => {
                const id = product._id || product.id;
                const isBusy = pending.has(id);
                const isAdding = adding.has(id);

                return (
                  <article key={id} className="product-item">
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
                        disabled={!product.isAvailable || isAdding}
                        onClick={() => handleAddToCart(product)}
                      >
                        {product.isAvailable
                          ? isAdding
                            ? "Adding…"
                            : "Add to Cart"
                          : "Unavailable"}
                      </button>

                      <button
                        className={`add-to-wishlist-btn active`}
                        aria-pressed={true}
                        aria-label="Remove from wishlist"
                        disabled={isBusy}
                        onClick={() => removeOne(id, product.productName)}
                        title="Remove from wishlist"
                      >
                        <i className="bi bi-heart-fill" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="wishlist-actions">
              <button
                className="btn btn-outline-primary"
                onClick={moveAllToCart}
              >
                Move All to Cart
              </button>
              <button className="btn btn-link text-danger" onClick={clearAll}>
                Clear Wishlist
              </button>
            </div>
          </>
        )}

        <h4 className="mt-5">You Might Also Like</h4>
        <div className="recommendations"></div>
      </div>
    </>
  );
}
