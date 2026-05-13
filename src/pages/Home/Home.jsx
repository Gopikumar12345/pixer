import { Link } from "react-router-dom";
import ProductCard from "../../components/Cards/ProductCard";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="container py-5 min-vh-100">
        {" "}
        <div className="row align-items-center">
          {/* LEFT TEXT */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold">Welcome to Pixer Marketplace</h1>

            <p className="lead text-muted">
              Discover amazing products with modern UI and smooth shopping
              experience.
            </p>

            <Link to="/products" className="btn btn-primary btn-lg mt-3">
              Shop Now
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              className="img-fluid rounded shadow"
              alt="Hero"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Pixer</h2>
          <p className="text-muted">
            Fast, secure and modern shopping experience
          </p>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>🚀 Fast Delivery</h5>
              <p className="text-muted">Quick delivery at your doorstep</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>🔒 Secure Payment</h5>
              <p className="text-muted">100% safe transactions</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>💰 Best Prices</h5>
              <p className="text-muted">Affordable products for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Featured Products</h2>

        {/* Product Grid */}
        <div className="row">
          <ProductCard />
        </div>
      </section>
    </>
  );
}

export default Home;
