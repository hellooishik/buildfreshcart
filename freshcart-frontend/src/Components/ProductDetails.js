import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/productDetails.css"

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${productId}`);
        setProduct(response.data);
        const similarResponse = await axios.get(`http://localhost:4000/products?category=${response.data.category}`);
        setSimilarProducts(similarResponse.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={`http://localhost:4000${product.image}`} alt={product.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-primary">₹{product.price}</h4>
          <button className="btn btn-danger">Add to Cart and test</button>
          <p className="text-success mt-3">Delivery in 90 mins</p>
        </div>
      </div>

      {/* Tabs Section */}
      <ul className="nav nav-tabs mt-5" id="productTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#whatYouGet" type="button" role="tab">What You Get</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#sourcing" type="button" role="tab">Sourcing</button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {/* What You Get Section */}
        <div className="tab-pane fade show active" id="whatYouGet" role="tabpanel">
          <ul className="list-group">
            {product.whatYouGet?.map((item, index) => (
              <li key={index} className="list-group-item">✅ {item}</li>
            ))}
          </ul>
        </div>

        {/* Sourcing Section */}
        <div className="tab-pane fade" id="sourcing" role="tabpanel">
          <p>{product.sourcing}</p>
        </div>
      </div>

      {/* Similar Products Section */}
      <h3 className="mt-5">You may also like</h3>
      <div className="row">
        {similarProducts.map((similar, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card">
              <img src={`http://localhost:4000${similar.image}`} alt={similar.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{similar.name}</h5>
                <p className="text-success">₹{similar.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
