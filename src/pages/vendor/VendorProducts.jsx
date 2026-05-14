import { useState } from "react";
import "./VendorProducts.css";

function VendorProducts() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle Input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Image
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      image: preview,
    };

    console.log("Product Added:", newProduct);

    alert("Product Added Successfully 🚀");

    // reset
    setProduct({
      title: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    });

    setImage(null);
    setPreview(null);
  };

  return (
    <div className="vendor-product-container">
      <h2 className="mb-4 fw-bold">Add New Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
        />

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImage} />

        {/* Preview */}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        {/* Button */}
        <button type="submit" className="btn-submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default VendorProducts;
