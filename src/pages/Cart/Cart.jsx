import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

import { CartContext } from "../../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  // 🔐 AUTH CHECK (IMPORTANT ADDITION)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Total Price
  const totalPrice = cart.reduce(
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

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <div className="card border-0 shadow-sm p-5">
            <h3>Your Cart is Empty 🛒</h3>
            <p className="text-muted mt-2">Add products to continue shopping</p>

            <button
              className="btn btn-dark mt-3 px-4 py-2"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div className="card p-3 mb-3 shadow-sm border-0" key={item.id}>
                <div className="row align-items-center">
                  {/* IMAGE */}
                  <div className="col-md-3 text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="img-fluid"
                      style={{ height: "120px", objectFit: "contain" }}
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="col-md-9 mt-3 mt-md-0">
                    <h5 className="fw-bold mb-2">{item.title}</h5>

                    <p className="text-muted mb-2">{item.category}</p>

                    <h5 className="text-success fw-bold">
                      ₹{item.price * item.quantity}
                    </h5>

                    {/* Quantity */}
                    <div className="d-flex align-items-center gap-2 mt-3 flex-wrap">
                      <button
                        className="btn btn-dark btn-sm px-3"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>

                      <span className="fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-dark btn-sm px-3"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>

                      <button
                        className="btn btn-danger btn-sm ms-md-3"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div className="card p-4 shadow border-0">
              <h4 className="fw-bold mb-4">Price Summary</h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Total Products</span>
                <span className="fw-bold">{cart.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery</span>
                <span className="text-success fw-bold">Free</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Platform Fee</span>
                <span>₹0</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Total</h5>
                <h5 className="fw-bold text-success">₹{totalPrice}</h5>
              </div>

              <button
                className="btn btn-dark w-100 py-3 fw-bold"
                onClick={() => navigate("/checkout")}
              >
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
