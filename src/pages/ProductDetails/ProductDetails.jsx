import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./ProductDetails.css";

import api from "../../api/api";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // SAFETY CHECK FUNCTION
  const isValidProduct = () => product && product.id;

  // CART
  const handleAddToCart = () => {
    if (!isValidProduct()) return;

    addToCart(product);
    toast.success("Product Added To Cart 🛒");
  };

  // BUY NOW
  const handleBuyNow = () => {
    if (!isValidProduct()) return;

    addToCart(product);
    toast.success("Redirecting To Checkout 🚀");
    navigate("/checkout");
  };

  // WISHLIST
  const handleWishlist = () => {
    if (!isValidProduct()) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      toast.warning("Already In Wishlist ❤️");
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    toast.success("Added To Wishlist ❤️");
  };

  // LOADING
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-muted">Loading product...</h5>
      </div>
    );
  }

  // NOT FOUND
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product Not Found</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/products")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-start">
        {/* IMAGE */}
        <div className="col-lg-6">
          <div className="product-image-wrapper shadow-sm border rounded-4 p-4 bg-white text-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid product-img"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="col-lg-6">
          <span className="badge bg-dark mb-3 text-uppercase">
            {product.category}
          </span>

          <h2 className="fw-bold mb-3">{product.title}</h2>

          {product.rating && (
            <p className="text-warning fw-semibold mb-2">
              ⭐ {product.rating.rate}
              <span className="text-muted ms-2">
                ({product.rating.count} reviews)
              </span>
            </p>
          )}

          <h3 className="text-success fw-bold mb-3">₹{product.price}</h3>

          <p className="text-muted lh-lg">{product.description}</p>

          {/* BUTTONS */}
          <div className="d-flex flex-wrap gap-3 mt-4">
            <button className="btn btn-dark px-4" onClick={handleAddToCart}>
              Add To Cart
            </button>

            <button className="btn btn-primary px-4" onClick={handleBuyNow}>
              Buy Now
            </button>

            <button className="btn btn-danger px-4" onClick={handleWishlist}>
              ❤️ Wishlist
            </button>
          </div>

          {/* INFO */}
          <div className="mt-5 border-top pt-4 text-muted small">
            <p>✅ 100% Original Product</p>
            <p>🚚 Free Delivery Available</p>
            <p>🔄 7 Days Easy Return</p>
            <p>🔒 Secure Payment Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
