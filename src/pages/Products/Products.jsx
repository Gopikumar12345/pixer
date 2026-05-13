function Products() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Products Page</h1>

      <p className="text-center text-muted">
        Explore all available products in Pixer Marketplace
      </p>

      {/* Products Grid */}
      <div className="row mt-4">
        {/* Product Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              className="card-img-top"
              alt="product"
            />
            <div className="card-body text-center">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">High quality product</p>
              <button className="btn btn-dark">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              className="card-img-top"
              alt="product"
            />
            <div className="card-body text-center">
              <h5 className="card-title">Product 2</h5>
              <p className="card-text">Latest trending product</p>
              <button className="btn btn-dark">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Product Card 3 */}
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <img
              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
              className="card-img-top"
              alt="product"
            />
            <div className="card-body text-center">
              <h5 className="card-title">Product 3</h5>
              <p className="card-text">Best selling item</p>
              <button className="btn btn-dark">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
