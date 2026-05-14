import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Load Cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Quantity Fix
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  // Save Cart
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove Product
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    updateCart(updatedCart);
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  // Total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Shopping Cart</h1>

        <p className="text-muted">Review your selected products</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="card border-0 shadow-lg p-5 text-center">
            <h3 className="fw-bold mb-3">Your Cart is Empty 🛒</h3>

            <p className="text-muted">Add products to continue shopping</p>

            <button
              className="btn btn-dark mt-3"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* LEFT */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div className="cart-product-card mb-4" key={item.id}>
                {/* IMAGE */}
                <div className="cart-image-box">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="cart-product-image"
                  />
                </div>

                {/* DETAILS */}
                <div className="cart-details">
                  <h4 className="fw-bold mb-2">{item.title}</h4>

                  <p className="text-muted mb-1">
                    Brand:
                    <span className="fw-semibold text-dark ms-2">
                      {item.brand}
                    </span>
                  </p>

                  <p className="text-muted mb-3">
                    Category:
                    <span className="fw-semibold text-dark ms-2">
                      {item.category}
                    </span>
                  </p>

                  <h4 className="text-success fw-bold mb-4">
                    ₹{item.price * item.quantity}
                  </h4>

                  {/* Quantity */}
                  <div className="quantity-section">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <span className="quantity-number">{item.quantity}</span>

                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    className="btn btn-danger remove-cart-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="price-summary-card">
              <h4 className="fw-bold mb-4">Price Details</h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Total Products</span>

                <span className="fw-semibold">{cartItems.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Fee</span>

                <span className="text-success fw-semibold">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total Amount</span>

                <span className="fw-bold text-success">₹{totalPrice}</span>
              </div>

              <button className="btn btn-dark w-100 py-3">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
