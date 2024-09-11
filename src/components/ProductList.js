import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productlist.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the product list!', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div class='products'>
      <ul>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <li key={product.id}>
              
              <div class='productbox'>
              <h2>{product.title}</h2>
              <img src={`${product.images}`} alt={product.title} style={{ width: '200px', height: 'auto' }} />

              <p>{product.description}</p>
              <p>Original Price: ${product.original_price}</p>
              <p>Offer Price: ${product.offer_price}</p></div>
              <div class='container'>
              <div>
              <h3>Seller Details</h3>
              {product.seller ? (
                <>
                  <p>{product.seller.name}</p>
                  {product.seller.logo && <img src={product.seller.logo} alt={product.seller.name} style={{ width: '100px', height: 'auto' }} />}
                  <p>Rating: {product.seller.rating}/5</p>
                </>
              ) : (
                <p>Seller information not available.</p>
              )}</div>

              <div>
              <h3>Reviews</h3>
              {product.reviews.length > 0 ? (
                product.reviews.map(review => (
                  <div key={review.id}>
                    <h4>{review.title}</h4>
                    {review.image && <img src={review.image} alt={review.title} style={{ width: '100px', height: 'auto' }} />}
                    <p>{review.description}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
