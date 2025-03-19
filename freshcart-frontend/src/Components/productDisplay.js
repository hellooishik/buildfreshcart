import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/productDisplay.css';

const ProductDisplay = ({ products, getImageUrl }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (!products || products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  return (
    <div className="product-display-container">
      <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
      <div className="product-scroll" ref={scrollRef}>
        {products.map((product) => (
          <div className="product-card" key={product._id} onClick={() => handleProductClick(product._id)}>
            <img src={getImageUrl(product.image)} alt={product.name} className="product-img" />
            <h5 className="fw-bold">{product.name}</h5>
            <p className="text-muted">${product.price.toFixed(2)}</p>
            <button className="btn btn-success">Add to Cart</button>
          </div>
        ))}
      </div>
      <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default ProductDisplay;
