import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./ProductDetails.css";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

  // ❌ Safety check (important)
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>No Product Found</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/products")}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Main Image
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Add To Cart (PRO FIXED)
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart 🛒");
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-md-6">
          {/* Main Image */}
          <div className="main-image-container text-center p-3 border rounded bg-light">
            <img
              src={mainImage}
              alt={product.title}
              className="img-fluid main-product-image"
              style={{
                height: "400px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Gallery */}
          <div className="d-flex gap-3 mt-3">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="gallery"
                onClick={() => setMainImage(image)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    mainImage === image ? "2px solid #000" : "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>

          <h4 className="text-success mb-3">₹{product.price}</h4>

          <p className="mb-1">
            <strong>Brand:</strong> {product.brand}
          </p>

          <p className="mb-1">
            <strong>Category:</strong> {product.category}
          </p>

          <p className="mt-3 text-muted">{product.description}</p>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-dark px-4" onClick={addToCart}>
              Add to Cart
            </button>

            <button className="btn btn-outline-dark px-4" onClick={addToCart}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
