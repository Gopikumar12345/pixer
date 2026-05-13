import { NavLink } from "react-router-dom";

function Navbar({ brandName = "Pixer" }) {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      {" "}
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand" to="/">
          {brandName}
        </NavLink>

        {/* Links */}
        <div>
          <NavLink className="text-white me-3 text-decoration-none" to="/">
            Home
          </NavLink>

          <NavLink
            className="text-white me-3 text-decoration-none"
            to="/products"
          >
            Products
          </NavLink>

          <NavLink className="text-white me-3 text-decoration-none" to="/cart">
            Cart
          </NavLink>

          {/* ✅ LOGIN ADDED */}
          <NavLink className="text-white text-decoration-none" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
