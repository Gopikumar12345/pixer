import "./Dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ✅ Memoized stats (performance improvement)
  const stats = useMemo(
    () => [
      { title: "Total Orders", value: "120" },
      { title: "Cart Items", value: cartCount },
      { title: "Wishlist", value: wishlistCount },
    ],
    [cartCount, wishlistCount]
  );

  // ✅ Optimized function (prevents re-creation)
  const updateData = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const totalCart = cart.reduce((t, i) => t + i.quantity, 0);

    setCartCount(totalCart);
    setWishlistCount(wishlist.length);
  }, []);

  useEffect(() => {
    updateData();

    window.addEventListener("storage", updateData);

    return () => window.removeEventListener("storage", updateData);
  }, [updateData]);

  // ✅ Logout optimized
  const handleLogout = useCallback(() => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }, [navigate]);

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
              🛒 Cart ({cartCount})
            </NavLink>
          </li>

          <li>
            <NavLink to="/wishlist" className="sidebar-link">
              ❤️ Wishlist ({wishlistCount})
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
            <NavLink to="/vendor/dashboard" className="sidebar-link vendor">
              🏪 Vendor Panel
            </NavLink>
          </li>

          <li>
            <button
              className="sidebar-link logout border-0 bg-transparent w-100 text-start"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
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
          {stats.map((item, index) => (
            <div className="stats-card" key={index}>
              <h5>{item.title}</h5>
              <h2>{item.value}</h2>

              {item.title === "Wishlist" && (
                <button
                  className="btn btn-dark btn-sm mt-3"
                  onClick={() => navigate("/wishlist")}
                >
                  Open Wishlist
                </button>
              )}
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="table-section">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h3 className="mb-0">Recent Orders</h3>

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
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
    </div>
  );
}

export default Dashboard;
