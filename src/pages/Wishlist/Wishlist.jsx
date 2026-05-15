import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // ✅ Load Wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(storedWishlist);
  }, []);

  // ✅ Total Wishlist Items
  const wishlistCount = useMemo(() => {
    return wishlist.length;
  }, [wishlist]);

  // ❌ Remove Product
  const removeWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);

    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // ✅ Toast Message
    toast.error("Removed From Wishlist ❌");
  };

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">My Wishlist ❤️</h1>

        <p className="text-muted">Save your favorite products</p>

        {/* Count */}
        <div className="mt-3">
          <span className="badge bg-dark px-3 py-2">
            Total Items: {wishlistCount}
          </span>
        </div>
      </div>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="text-center mt-5">
          <div className="card shadow border-0 p-5">
            <h3>No Wishlist Products</h3>

            <p className="text-muted">Your wishlist is empty</p>

            <button
              className="btn btn-dark mt-3"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={product.id}>
              <div className="card shadow border-0 h-100 wishlist-card">
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top img-fluid"
                  loading="lazy"
                  style={{
                    height: "220px",
                    objectFit: "contain",
                    padding: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/product-details", {
                      state: product,
                    })
                  }
                />

                {/* Body */}
                <div className="card-body d-flex flex-column">
                  <h6
                    className="fw-bold"
                    style={{
                      minHeight: "48px",
                    }}
                  >
                    {product.title}
                  </h6>

                  <p className="text-muted small">{product.category}</p>

                  <h5 className="text-success mb-3">₹{product.price}</h5>

                  {/* Buttons */}
                  <div className="mt-auto d-flex gap-2 flex-wrap">
                    <button
                      className="btn btn-dark flex-fill"
                      onClick={() =>
                        navigate("/product-details", {
                          state: product,
                        })
                      }
                    >
                      View
                    </button>

                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() => removeWishlist(product.id)}
                    >
                      Remove
                    </button>
                  </div>
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
