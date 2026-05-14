import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const featuredProducts = [
    {
      id: 1,
      title: "Smart Watch",
      brand: "Apple Smart Watch",
      price: "₹2999",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      description:
        "Advanced fitness tracking, heart rate monitor, and smart notifications.",
    },
    {
      id: 2,
      title: "Smart Phone",
      brand: "Smartphone",
      price: "₹45999",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      description:
        "High-performance mobile phone with powerful camera and fast processor.",
    },
    {
      id: 3,
      title: "Speaker",
      brand: "Bluetooth Speaker",
      price: "₹1999",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
      description:
        "Portable speaker with powerful bass and clear sound quality.",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="container py-5 min-vh-100 d-flex align-items-center">
        <div className="row align-items-center w-100">
          <div className="col-md-6 text-center text-md-start">
            <span className="badge bg-dark mb-3 px-3 py-2">
              Modern Ecommerce Marketplace
            </span>

            <h1 className="display-4 fw-bold mb-4">
              Welcome to <span className="text-primary">Pixer</span>
            </h1>

            <p className="lead text-muted mb-4">
              Discover premium products with smooth shopping experience.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link to="/products" className="btn btn-primary btn-lg px-4">
                Shop Now
              </Link>

              <Link
                to="/dashboard"
                className="btn btn-outline-dark btn-lg px-4"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              className="img-fluid rounded-4 shadow"
              alt="hero"
              style={{ maxHeight: "450px", objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Pixer</h2>
          <p className="text-muted">Fast, secure and modern shopping</p>
        </div>

        <div className="row g-4">
          {[
            { icon: "🚀", title: "Fast Delivery" },
            { icon: "🔒", title: "Secure Payment" },
            { icon: "💰", title: "Best Prices" },
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <div className="p-4 bg-white shadow-sm rounded-4 text-center h-100 feature-card">
                <div className="fs-1">{f.icon}</div>
                <h5 className="fw-bold mt-2">{f.title}</h5>
                <p className="text-muted small">
                  Premium experience with modern UI.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 className="fw-bold">Featured Products</h2>
            <p className="text-muted">Explore trending products</p>
          </div>

          <Link to="/products" className="btn btn-dark">
            View All
          </Link>
        </div>

        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 product-card">
                {/* IMAGE FIXED SIZE */}
                <div className="product-img-box">
                  <img src={product.image} alt="" />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{product.title}</h5>
                  <p className="text-primary small mb-1">{product.brand}</p>
                  <p className="text-muted small flex-grow-1">
                    {product.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold text-success mb-0">
                      {product.price}
                    </h6>

                    <Link to="/products" className="btn btn-sm btn-dark">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Trending Products</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-dark text-white rounded-4 h-100">
              Smart Gadgets
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-primary text-white rounded-4 h-100">
              Fashion Collection
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-success text-white rounded-4 h-100">
              Audio Devices
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
