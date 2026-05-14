import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import "./VendorDashboard.css";

function VendorDashboard() {
  // Sample Analytics Data
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 6000 },
  ];

  const orderData = [
    { name: "Pending", value: 12 },
    { name: "Shipped", value: 20 },
    { name: "Delivered", value: 45 },
  ];

  return (
    <div className="vendor-dashboard">
      {/* TOP CARDS */}
      <div className="stats-grid">
        <div className="stats-card">
          <h4>Total Sales</h4>
          <h2>₹45,000</h2>
        </div>

        <div className="stats-card">
          <h4>Total Orders</h4>
          <h2>120</h2>
        </div>

        <div className="stats-card">
          <h4>Earnings</h4>
          <h2>₹18,500</h2>
        </div>

        <div className="stats-card">
          <h4>Products</h4>
          <h2>35</h2>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="charts-grid">
        {/* LINE CHART */}
        <div className="chart-card">
          <h3>Sales Overview</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="chart-card">
          <h3>Order Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
