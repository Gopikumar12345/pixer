import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";

function Navbar({ brandName = "Pixer" }) {
  const [cartCount, setCartCount] = useState(0);

  // Load Cart Count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(totalQuantity);
    };

    updateCartCount();

    // Update automatically
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-3" to="/">
          {brandName}
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {/* Products */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>

            {/* Cart */}
            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>

              {/* Cart Badge */}
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </li>

            {/* Dashboard */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>

            <NavLink
              className="btn btn-outline-light ms-lg-2"
              to="/vendor/dashboard"
            >
              Vendor
            </NavLink>

            {/* Login Button */}
            <li className="nav-item">
              <NavLink
                className="btn btn-primary px-4 mt-3 mt-lg-0 ms-lg-2"
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
