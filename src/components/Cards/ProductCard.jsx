import "./productCard.css";

function ProductCard() {
  return (
    <div className="card-container">
      <div className="card">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="Smart Watch"
        />

        <h3>Apple Smart Watch</h3>
        <p>
          Advanced fitness tracking, heart rate monitor, and smart
          notifications.
        </p>

        <button>Buy Now</button>
      </div>

      <div className="card">
        <img
          src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5"
          alt="Smart Phone"
        />

        <h3>Smartphone</h3>
        <p>
          High-performance mobile phone with powerful camera and fast processor.
        </p>

        <button>Buy Now</button>
      </div>

      <div className="card">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="Speaker"
        />

        <h3>Bluetooth Speaker</h3>
        <p>Portable speaker with powerful bass and clear sound quality.</p>

        <button>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
