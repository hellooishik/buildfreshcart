import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Product not found or error fetching product details.');
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6">
          <img src={`http://localhost:4000${product.image}`} alt={product.name} className="w-100 rounded" />
        </div>

        {/* Product Info Section */}
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3 className="text-danger">₹{product.price} <small className="text-muted">MRP: ₹{product.mrp}</small></h3>
          <button className="btn btn-primary my-3" onClick={() => navigate('/cart')}>Add to Cart</button>
          <p><strong>Delivery Time:</strong> 90 mins</p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="my-5">
        <h2>What you get</h2>
        <ul>
          {product.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
