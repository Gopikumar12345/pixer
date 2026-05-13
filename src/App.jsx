import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar brandName="Pixer Marketplace" />

      {/* All pages handled by router */}
      <AppRoutes />

      <Footer year={2026} />
    </>
  );
}

export default App;
