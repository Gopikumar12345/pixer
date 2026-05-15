import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load Wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4 text-center">My Wishlist ❤️</h1>

      <div className="row">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div className="col-lg-3 col-md-6 mb-4" key={item.id}>
              <div className="card shadow border-0 h-100">
                <img
                  src={item.image}
                  className="card-img-top p-3"
                  style={{
                    height: "220px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body">
                  <h6 className="fw-bold">{item.title}</h6>

                  <p className="text-muted small">{item.category}</p>

                  <h5 className="text-success">₹{item.price}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h4>No Wishlist Items ❤️</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
