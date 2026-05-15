import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Navbar({ brandName = "Pixer" }) {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // 🔐 JWT token check
  const token = localStorage.getItem("token");

  // 🚪 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userSession");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container">
        {/* BRAND */}
        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          {brandName}
        </NavLink>

        {/* TOGGLE */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>

            {/* CART */}
            <li className="nav-item position-relative">
              <NavLink className="nav-link pe-3" to="/cart">
                Cart
              </NavLink>

              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  {cartCount}
                </span>
              )}
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>

            {/* 🔐 AUTH BUTTONS */}
            {!token ? (
              <>
                {/* REGISTER */}
                <li className="nav-item mt-2 mt-lg-0">
                  <NavLink
                    className="btn btn-primary w-100 px-3"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>

                {/* LOGIN */}
                <li className="nav-item mt-2 mt-lg-0">
                  <NavLink className="btn btn-success w-100 px-3" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              /* LOGOUT */
              <li className="nav-item mt-2 mt-lg-0">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger w-100 px-3"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
