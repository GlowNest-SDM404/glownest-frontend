import { useState } from "react";
import { useUser } from "../contexts/UserContext";

import "../styles/Profile.css";

export default function Profile() {
  const { user, logout } = useUser();
  // useEffect to populates the form fields using the decoded JWT

  const [form, setForm] = useState({
    fullName: "John Doe",
    email: "johndoe123@gmail.com",
    phone: "0403—123—456",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });

  const avatarInitials = form.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // To save updated profile:
  // PUT http://localhost:PORT/update_profile
  // Body: { fullName, email, phone, password, newsletter }
  // Header: Authorization: Bearer <token>

  return (
    <div className="container profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-header">
          <div className="avatar">{form.fullName ? avatarInitials : ""}</div>
          <button>Upload</button>
          <h5 className="mt-3 mb-1">{form.fullName}</h5>
          <p className="email">{form.email}</p>
        </div>
        <nav className="nav flex-column">
          <a className="nav-link active" href="/profile">
            Account Details
          </a>
          <a className="nav-link" href="#">
            Order History
          </a>
          <a className="nav-link" href="/wishlist">
            My Wishlist
          </a>
          <a className="nav-link" href="#">
            Address Book
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="account-details">
        <h3>Account Details</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input
            className="form-control"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password Confirmation</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        <div className="form-check my-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="newsletterCheck"
            checked={form.newsletter}
            onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="newsletterCheck">
            Subscribe to GlowNest's newsletter for product updates and
            promotions.
          </label>
        </div>

        <div className="profile-btns">
          <button>Save Changes</button>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
