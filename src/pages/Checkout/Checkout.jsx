import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 💳 Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 💰 Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🛒 Empty cart protection
  if (!cart || cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty 🛒</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/products")}
        >
          Go to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-lg-7">
          {/* CHECKOUT FORM */}
          <div className="card shadow border-0 p-4 mb-4">
            <h3 className="fw-bold mb-4">Checkout Details</h3>

            <form>
              <div className="row g-3">
                {/* NAME */}
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" />
                </div>

                {/* PHONE */}
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" />
                </div>

                {/* EMAIL */}
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" />
                </div>

                {/* ADDRESS */}
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" rows="4"></textarea>
                </div>

                {/* CITY */}
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" />
                </div>

                {/* PINCODE */}
                <div className="col-md-6">
                  <label className="form-label">Pincode</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </form>
          </div>

          {/* PAYMENT METHODS */}
          <div className="card shadow border-0 p-4">
            <h4 className="fw-bold mb-4">Payment Method</h4>

            {/* COD */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <label className="form-check-label fw-semibold">
                Cash On Delivery
              </label>
            </div>

            {/* CARD */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <label className="form-check-label fw-semibold">
                Credit / Debit Card
              </label>
            </div>

            {/* CARD FIELDS */}
            {paymentMethod === "card" && (
              <div className="mt-3">
                <input className="form-control mb-3" placeholder="Name" />
                <input
                  className="form-control mb-3"
                  placeholder="Card Number"
                />
                <div className="row">
                  <div className="col-md-6">
                    <input className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" placeholder="CVV" />
                  </div>
                </div>
              </div>
            )}

            {/* UPI */}
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              <label className="form-check-label fw-semibold">
                UPI / Razorpay
              </label>
            </div>

            {paymentMethod === "upi" && (
              <input className="form-control mt-3" placeholder="Enter UPI ID" />
            )}

            {/* BUTTON */}
            <button className="btn btn-dark mt-4 w-100 py-3">
              Pay Securely
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-5">
          <div className="card shadow border-0 p-4">
            <h4 className="fw-bold mb-4">Order Summary</h4>

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-3"
              >
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <small className="text-muted">Qty: {item.quantity}</small>
                </div>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5 className="text-success">₹{totalPrice}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
