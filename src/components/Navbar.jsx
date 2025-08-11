import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#ff6b6b" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          GlowNest
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                WishList
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <SearchBar initial="" />

            <button
              className="logout-btn custom-btn"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
