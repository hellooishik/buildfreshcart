// CustomerReviews.jsx
import React from 'react';
import '../css/CustomerReviews.css';

const reviews = [
  {
    quote: "Freshcart chicken is my son’s favourite - it’s juicy and clean.",
    name: "Dipanjana Nandi",
    location: "Bengaluru"
  },
  {
    quote: "Freshcart makes cooking easy with pre-cut & cleaned meats!",
    name: "Shalini Bardhan",
    location: "Kolkata"
  },
  {
    quote: "Absolutely love Licious Prawns! They are soft, juicy & cleaned.",
    name: "Rukma Dakshy",
    location: "Kolkata"
  },
  {
    quote: "I’ve never had Chicken that’s better than Licious!",
    name: "Biltu Mazumder",
    location: "Kolkata"
  },
  {
    quote: "I love how juicy Licious’ Chicken Breast Boneless is.",
    name: "Alfateh Mustafa",
    location: "Bengaluru"
  }
];

const CustomerReviews = () => {
  return (
    <div className="container-fluid py-5">
      <h2 className="text-center fw-bold">What Our Customers Say</h2>
      <p className="text-center text-muted">Hear it directly from people like you</p>

      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {reviews.map((review, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="card p-4 shadow-sm text-center">
                <blockquote className="blockquote mb-4">{review.quote}</blockquote>
                <footer>
                  <p className="fw-bold mb-1">{review.name}</p>
                  <p className="text-muted">{review.location}</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;