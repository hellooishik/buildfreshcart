import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/homepage.css";
import LoggedInHomePage from "./LoggedInHomePage";
import Header from "../Components/header";
import Hero from "../Components/hero";
import Footer from "../Components/footer";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(storedUser);

    axios.get("http://localhost:4000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios.get("http://localhost:4000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const getImageUrl = (imagePath) => {
    return `http://localhost:4000${imagePath.replace(/\\/g, '/')}`;
  };

  if (user) {
    return <LoggedInHomePage user={user} products={products} categories={categories} />;
  }

  return (
    <div className="homepage-container">
      <Header />
      <Hero />

      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Fresh Meat, Eggs & Fishes</h2>
        {categories.length > 0 ? (
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-md-4" key={category._id}>
                <div className="category-card p-4 text-center bg-light shadow-sm rounded border">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No categories available.</p>
        )}
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Fresh Deals for You</h2>
        {products.length > 0 ? (
          <div className="row g-3">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="product-card p-3 text-center bg-white shadow-sm rounded border position-relative">
                  <img src={getImageUrl(product.image)} alt={product.name} className="w-100 rounded-top" />
                  <div className="p-3">
                    <h5 className="fw-bold">{product.name}</h5>
                    <p className="text-muted">${product.price}</p>
                    <button className="btn btn-success w-100">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
