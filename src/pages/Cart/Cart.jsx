function Cart() {
  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">Shopping Cart</h1>

      <p className="text-center text-muted">
        Review your selected products before checkout
      </p>

      {/* Empty Cart UI */}
      <div className="text-center mt-5">
        <div className="card shadow p-5">
          <h3>Your Cart is Empty 🛒</h3>

          <p className="text-muted">
            Looks like you haven't added anything yet.
          </p>

          <button className="btn btn-dark mt-3">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
