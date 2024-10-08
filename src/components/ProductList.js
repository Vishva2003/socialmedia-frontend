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
      <ul class='productcontainer'>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <li class='product-items' key={product.id}>
              
              <div class='productbox'>
              <img src={`${product.images}`} alt={product.title} style={{ width: '200px', height: 'auto' }} />
              <h2>{product.title}</h2>

              <div class='price'>
              <p class='green'>Rs. {product.original_price}</p>
              <p class='red'>{product.offer_price}</p></div>
              
              </div>
              <div class='container'>
              <p>{product.description}</p>

                <div class='seller'>
                <h3>Seller Details</h3>
                {product.seller ? (
                <>
                  {product.seller.logo && <img src={product.seller.logo} alt={product.seller.name} style={{ width: '50px', height: 'auto' }} />}
                  <p>{product.seller.name}</p>
                  <p>Rating: {product.seller.rating}/5</p>
                </>
              ) : (
                <p>Seller information not available.</p>
              )}</div>

              <div>

              <div class='reveiw'>
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
              </div>
            </li>
          ))
        )}
      </ul>
    </div>

    
  );
};

export default ProductList;
