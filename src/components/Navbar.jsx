import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#ff6b6b" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GlowNest
        </a>
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                WishList
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>

            {/* Conditional rendering based on user authentication */}
            {user ? (
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="btn btn-outline-primary"
                type="button"
              >
                Login
              </a>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
