import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/homepage.css";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories
    axios.get("http://localhost:5000/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));

    // Fetch products
    axios.get("http://localhost:5000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-success" to="/">
            FreshCart
          </Link>
          <div className="d-flex gap-3">
            <Link className="btn btn-outline-success" to="/login">Login</Link>
            <Link className="btn btn-success" to="/cart">Cart</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <div className="hero-section text-center py-5 bg-success text-white d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 fw-bold">Shop Fresh Groceries Online</h1>
        <p className="lead">Get fresh groceries delivered to your doorstep in minutes!</p>
        <input
          type="text"
          className="form-control w-50 mx-auto rounded-pill p-2"
          placeholder="Search for products..."
        />
      </div>

      {/* Categories Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Shop by Category</h2>
        <div className="row g-3">
          {categories.map(category => (
            <div className="col-md-3" key={category._id}>
              <div className="category-card p-4 text-center bg-light shadow-sm rounded border">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Featured Products</h2>
        <div className="row g-3">
          {products.map(product => (
            <div className="col-md-3" key={product._id}>
              <div className="product-card p-3 text-center bg-white shadow-sm rounded border position-relative">
                <img src={product.image} alt={product.name} className="w-100 rounded-top" />
                <div className="p-3">
                  <h5 className="fw-bold">{product.name}</h5>
                  <p className="text-muted">${product.price}</p>
                  <button className="btn btn-success w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
