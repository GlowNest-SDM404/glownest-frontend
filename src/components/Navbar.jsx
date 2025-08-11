import { useUser } from "../contexts/UserContext";
import "../styles/Navbar.css";
import logo from "../assets/logo/GlowNest.png";

const Navbar = () => {
  const { logout } = useUser();

  // const fullName = user?.firstName && user?.lastName
  //   ? `${user.firstName} ${user.lastName}`
  //   : "User";

  // const avatarInitials = fullName
  //   .split(" ")
  //   .map((n) => n[0])
  //   .join("")
  //   .toUpperCase();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img
          src={logo}
          alt="GlowNest Logo" 
          className="navbar-logo"
        />
        <a href="/" className="custom-link">
          <span className="brand-name">
            <strong>GlowNest</strong>
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="cart-wrapper">
          <a href="/checkout" className="custom-link">
            <i className="bi bi-cart3 cart-icon"></i>
          </a>
        </div>

        <div className="search-wrapper">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search Products..."
          />
        </div>

        <div className="d-flex ms-auto">
          <button
            className="btn btn-outline-light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {/* <div className="user-avatar">{avatarInitials}</div> */}
      </div>
    </nav>
  );
};

export default Navbar;