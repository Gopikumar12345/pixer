import "./Dashboard.css";
import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">Pixer</div>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" className="sidebar-link">
              📊 Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className="sidebar-link">
              🛍️ Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" className="sidebar-link">
              🛒 Cart
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="sidebar-link">
              📦 Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="sidebar-link">
              ⚙️ Settings
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className="sidebar-link logout">
              🚪 Logout
            </NavLink>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>User Dashboard</h1>
          <p>Welcome back 👋 Manage your store here</p>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stats-card">
            <h5>Total Orders</h5>
            <h2>120</h2>
          </div>

          <div className="stats-card">
            <h5>Cart Items</h5>
            <h2>08</h2>
          </div>

          <div className="stats-card">
            <h5>Wishlist</h5>
            <h2>15</h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-section">
          <h3>Recent Orders</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#PX101</td>
                <td>Smart Watch</td>
                <td>
                  <span className="badge success">Delivered</span>
                </td>
                <td>₹2999</td>
              </tr>

              <tr>
                <td>#PX102</td>
                <td>Camera</td>
                <td>
                  <span className="badge pending">Pending</span>
                </td>
                <td>₹45999</td>
              </tr>

              <tr>
                <td>#PX103</td>
                <td>Shoes</td>
                <td>
                  <span className="badge shipped">Shipped</span>
                </td>
                <td>₹2499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
