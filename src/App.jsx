import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Context Provider
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      {/* HEADER */}
      <Navbar brandName="Pixer Marketplace" />

      {/* ALL ROUTES */}
      <AppRoutes />

      {/* FOOTER */}
      <Footer year={2026} />

      {/* ✅ GLOBAL TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </CartProvider>
  );
}

export default App;
