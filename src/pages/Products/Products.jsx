import Loader from "../../components/Loader/Loader";
import { useEffect, useState, useContext, useMemo } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

function Products() {
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // GET API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("API Error:", error);
        toast.error("Failed To Load Products ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Wishlist
  const addToWishlist = (product) => {
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

  // Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Product Added To Cart 🛒");
  };

  // FILTERS
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      let matchesPrice = true;

      if (price === "below2000") {
        matchesPrice = product.price < 2000;
      } else if (price === "2000to5000") {
        matchesPrice = product.price >= 2000 && product.price <= 5000;
      } else if (price === "above5000") {
        matchesPrice = product.price > 5000;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, price]);

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Products Marketplace</h1>
        <p className="text-muted">Explore premium products</p>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="below2000">Below ₹2000</option>
            <option value="2000to5000">₹2000 - ₹5000</option>
            <option value="above5000">Above ₹5000</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Products */}
      <div className="row">
        {!loading &&
          (filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <div className="col-lg-3 col-md-6 mb-4" key={product.id}>
                  <div className="card shadow border-0 h-100 product-card">
                    {/* ✅ FIXED ROUTE HERE */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top img-fluid"
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        cursor: "pointer",
                        padding: "15px",
                      }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />

                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-bold">{product.title}</h6>
                      <p className="text-muted small">{product.category}</p>
                      <h5 className="text-success">₹{product.price}</h5>

                      <div className="mt-auto d-flex gap-2">
                        <button
                          className="btn btn-outline-dark w-50"
                          onClick={() => handleAddToCart(product)}
                        >
                          Cart
                        </button>

                        {/* ✅ FIXED ROUTE HERE */}
                        <button
                          className="btn btn-dark w-50"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          Buy
                        </button>
                      </div>

                      <button
                        className="btn btn-light mt-2 w-100"
                        onClick={() => addToWishlist(product)}
                      >
                        ❤️ Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : !loading && (
                <div className="text-center py-5">
                  <h4 className="text-danger">No Products Found 😢</h4>
                  <p>Try changing filters</p>
                </div>
              ))}
      </div>
    </div>
  );
}

export default Products;
