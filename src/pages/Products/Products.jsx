import { useState } from "react";

import "./Products.css";

import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  // Product Data
  const productsData = [
    {
      id: 1,

      title: "Smart Watch",

      category: "Electronics",

      brand: "Apple",

      price: 2999,

      rating: 4.5,

      description: "Premium smart watch with health tracking features.",

      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",

        "https://images.unsplash.com/photo-1546868871-7041f2a55e12",

        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
      ],
    },

    {
      id: 2,

      title: "Wireless Headphones",

      category: "Electronics",

      brand: "Sony",

      price: 1999,

      rating: 4.3,

      description: "Noise cancellation wireless headphones.",

      images: [
        "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500",

        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",

        "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      ],
    },

    {
      id: 3,

      title: "DSLR Camera",

      category: "Accessories",

      brand: "Canon",

      price: 45999,

      rating: 4.8,

      description: "Professional DSLR camera for photography.",

      images: [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",

        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",

        "https://images.unsplash.com/photo-1495707902641-75cac588d2e9",
      ],
    },

    {
      id: 4,

      title: "Running Shoes",

      category: "Fashion",

      brand: "Nike",

      price: 2499,

      rating: 4.2,

      description: "Comfortable running shoes for daily workouts.",

      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

        "https://images.unsplash.com/photo-1549298916-b41d501d3772",

        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      ],
    },
  ];

  // States
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [brand, setBrand] = useState("All");

  const [price, setPrice] = useState("All");

  // Add To Cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Existing Product Check
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

  // Add To Wishlist
  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = wishlist.find((item) => item.id === product.id);

    if (alreadyExists) {
      alert("Already In Wishlist ❤️");

      return;
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Added To Wishlist ❤️");
  };

  // Filter Logic
  const filteredProducts = productsData.filter((product) => {
    // Search
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Category
    const matchesCategory = category === "All" || product.category === category;

    // Brand
    const matchesBrand = brand === "All" || product.brand === brand;

    // Price
    let matchesPrice = true;

    if (price === "below2000") {
      matchesPrice = product.price < 2000;
    } else if (price === "2000to5000") {
      matchesPrice = product.price >= 2000 && product.price <= 5000;
    } else if (price === "above5000") {
      matchesPrice = product.price > 5000;
    }

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Products Marketplace</h1>

        <p className="text-muted">Explore premium products</p>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-5">
        {/* Search */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>

            <option value="Electronics">Electronics</option>

            <option value="Accessories">Accessories</option>

            <option value="Fashion">Fashion</option>
          </select>
        </div>

        {/* Brand */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="All">All Brands</option>

            <option value="Apple">Apple</option>

            <option value="Sony">Sony</option>

            <option value="Canon">Canon</option>

            <option value="Nike">Nike</option>
          </select>
        </div>

        {/* Price */}
        <div className="col-md-3">
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

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-lg-3 col-md-6 mb-4" key={product.id}>
              <div className="card shadow h-100 border-0 product-card">
                {/* Product Image */}
                <div className="position-relative">
                  <img
                    src={product.images[0]}
                    className="card-img-top product-image"
                    alt={product.title}
                    onClick={() =>
                      navigate("/product-details", {
                        state: product,
                      })
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  />

                  {/* Wishlist */}
                  <button
                    className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                    onClick={() => addToWishlist(product)}
                  >
                    ❤️
                  </button>
                </div>

                {/* Body */}
                <div className="card-body d-flex flex-column">
                  <p className="text-muted small mb-1">{product.brand}</p>

                  <h5 className="fw-bold">{product.title}</h5>

                  <p className="small text-secondary">{product.category}</p>

                  <div className="mb-2">⭐ {product.rating}</div>

                  <h5 className="fw-bold text-success mb-4">
                    ₹{product.price}
                  </h5>

                  {/* Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    {/* Cart */}
                    <button
                      className="btn btn-outline-dark w-50"
                      onClick={() => addToCart(product)}
                    >
                      Cart
                    </button>

                    {/* Buy */}
                    <button
                      className="btn btn-dark w-50"
                      onClick={() =>
                        navigate("/product-details", {
                          state: product,
                        })
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h3>No Products Found</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
