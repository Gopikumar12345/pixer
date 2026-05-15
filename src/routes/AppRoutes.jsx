import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "../auth/ProtectedRoute";

// ====================
// LAZY LOADING PAGES
// ====================

const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const ProductDetails = lazy(() =>
  import("../pages/ProductDetails/ProductDetails")
);
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));

// ====================
// VENDOR PAGES
// ====================

const VendorLayout = lazy(() => import("../layouts/VendorLayout"));
const VendorDashboard = lazy(() => import("../pages/vendor/VendorDashboard"));
const VendorProducts = lazy(() => import("../pages/vendor/VendorProducts"));
const VendorOrders = lazy(() => import("../pages/vendor/VendorOrders"));
const VendorEarnings = lazy(() => import("../pages/vendor/VendorEarnings"));
const VendorSettings = lazy(() => import("../pages/vendor/VendorSettings"));

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="text-center">
            <div className="spinner-border text-dark mb-3" role="status"></div>
            <h5 className="fw-bold">Loading Page...</h5>
          </div>
        </div>
      }
    >
      <Routes>
        {/* ==================== */}
        {/* PUBLIC ROUTES */}
        {/* ==================== */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ==================== */}
        {/* USER PROTECTED ROUTES */}
        {/* ==================== */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔥 Dynamic route (BEST PRACTICE) */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* ==================== */}
        {/* VENDOR ROUTES */}
        {/* ==================== */}

        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="earnings" element={<VendorEarnings />} />
          <Route path="settings" element={<VendorSettings />} />
        </Route>

        {/* ==================== */}
        {/* INVALID ROUTE */}
        {/* ==================== */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
