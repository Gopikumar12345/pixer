import "./productCard.css";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ products = [] }) {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      {products.length === 0 ? (
        <p className="text-center">No Products Found</p>
      ) : (
        products.map((item, index) => (
          <div className="card" key={item.id || index}>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              onClick={() => navigate("/product-details", { state: item })}
            />

            <h3>{item.title}</h3>

            <p>{item.description?.slice(0, 80) + "..."}</p>

            <button
              onClick={() => navigate("/product-details", { state: item })}
            >
              Buy Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default memo(ProductCard);
