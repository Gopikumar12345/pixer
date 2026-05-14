import { NavLink, Outlet } from "react-router-dom";
import "./VendorLayout.css"; // ✅ same name hona chahiye

function VendorLayout() {
  return (
    <div className="vendor-container">
      <div className="vendor-sidebar">
        <h2 className="vendor-logo">Pixer Vendor</h2>

        <NavLink to="/vendor/dashboard" className="vendor-link">
          Dashboard
        </NavLink>

        <NavLink to="/vendor/products" className="vendor-link">
          Products
        </NavLink>

        <NavLink to="/vendor/orders" className="vendor-link">
          Orders
        </NavLink>

        <NavLink to="/vendor/earnings" className="vendor-link">
          Earnings
        </NavLink>

        <NavLink to="/vendor/settings" className="vendor-link">
          Settings
        </NavLink>
      </div>

      <div className="vendor-content">
        <Outlet />
      </div>
    </div>
  );
}

export default VendorLayout;
