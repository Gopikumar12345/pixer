import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import Wishlist from "../pages/Wishlist/Wishlist";

// Vendor
import VendorLayout from "../layouts/VendorLayout";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import VendorProducts from "../pages/vendor/VendorProducts";
import VendorOrders from "../pages/vendor/VendorOrders";
import VendorEarnings from "../pages/vendor/VendorEarnings";
import VendorSettings from "../pages/vendor/VendorSettings";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* Vendor Routes */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="earnings" element={<VendorEarnings />} />
        <Route path="settings" element={<VendorSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
