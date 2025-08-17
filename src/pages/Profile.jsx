import { useState, useMemo, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import AddressBook from "../components/AddressBook";
import AccountDetails from "../components/AccountDetails";
import WishList from "../components/WishList";
import OrderHistory from "../components/OrderHistory";

import "../styles/Profile.css";

import { useParams, useNavigate } from "react-router-dom";

export default function Profile({ activeTab = "account" }) {
  const { tab } = useParams(); // "account" | "addresses" | "wishlist" | "Order History"
  const [active, setActive] = useState(tab || activeTab || "account");

  useEffect(() => {
    if (tab && tab !== active) setActive(tab);
  }, [tab]);

  const { user, logout } = useUser();

  const fullName = useMemo(
    () => `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest",
    [user]
  );

  const avatarInitials = useMemo(
    () =>
      fullName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    [fullName]
  );

  return (
    <div className="container profile-container">
      {/* Sidebar stays put */}
      <aside className="sidebar">
        <div className="profile-header">
          <div className="avatar">{avatarInitials}</div>

          <h5 className="mt-3 mb-1">{fullName}</h5>
          <p className="email">{user?.email || ""}</p>
        </div>
        <nav className="nav flex-column">
          <button
            className={`nav-link ${active === "account" ? "active" : ""}`}
            onClick={() => setActive("account")}
          >
            Account Details
          </button>
          <button
            className={`nav-link ${active === "addresses" ? "active" : ""}`}
            onClick={() => setActive("addresses")}
          >
            Address Book
          </button>
          <button
            className={`nav-link ${active === "wishlist" ? "active" : ""}`}
            onClick={() => setActive("wishlist")}
          >
            My Wishlist
          </button>
          <button
            className={`nav-link ${active === "order-history" ? "active" : ""}`}
            onClick={() => setActive("order-history")}
          >
            Order History
          </button>
        </nav>
      </aside>

      {/* Main content swaps here */}
      <main className="account-details">
        {active === "account" ? (
          <AccountDetails onLogout={logout} />
        ) : active === "addresses" ? (
          <AddressBook />
        ) : active === "wishlist" ? (
          <WishList />
        ) : active === "order-history" ? (
          <OrderHistory />
        ) : null}
      </main>
    </div>
  );
}
