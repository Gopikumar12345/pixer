import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load Wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(storedWishlist);
  }, []);

  // Remove Product
  const removeWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);

    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center mb-4">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-5">
          <div className="card shadow p-5">
            <h3>No Wishlist Products</h3>

            <p className="text-muted">Your wishlist is empty</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card shadow h-100">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body text-center">
                  <h5>{product.title}</h5>

                  <p className="text-muted">{product.brand}</p>

                  <h6 className="fw-bold text-success">₹{product.price}</h6>

                  <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={() => removeWishlist(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
