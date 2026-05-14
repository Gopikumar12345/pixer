import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ brandName = "Pixer" }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = cart.reduce((t, i) => t + i.quantity, 0);
      setCartCount(totalQuantity);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          {brandName}
        </NavLink>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNavbar">
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

            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>

              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>

            {/* 🔥 Vendor Button Professional */}
            <li className="nav-item">
              <NavLink
                to="/vendor/dashboard"
                className="btn btn-primary ms-lg-2 px-3"
              >
                Vendor
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="btn btn-outline-light ms-lg-2 px-3"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
