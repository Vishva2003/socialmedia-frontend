import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    original_price: '',
    offer_price: '',
    seller: { name: '', logo: null, rating: '', warranty_offer: '' },
    reviews: [{ title: '', image: null, description: '' }],
    images: null
  });

  // Handle input changes for simple text/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Handle seller field changes
  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      seller: {
        ...prevProduct.seller,
        [name]: value
      }
    }));
  };

  
  // Handle file input changes (product images and seller logo)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: files[0] // Ensure to grab only the first file
    }));
  };


  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('original_price', product.original_price);
    formData.append('offer_price', product.offer_price);
  
    // Append product image if available
    if (product.images) {
      formData.append('images', product.images);
    }
  
    // Append seller logo (file)
    if (product.seller.logo) {
      formData.append('seller.logo', product.seller.logo);
    }
  
    // Append seller text details
    formData.append('seller.name', product.seller.name);
    formData.append('seller.rating', product.seller.rating);
    formData.append('seller.warranty_offer', product.seller.warranty_offer);

  
    // Send form data to backend
    axios.post('http://localhost:8000/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Product created successfully', response);
      })
      .catch(error => {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
      });
  };
  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="title" value={product.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required></textarea>
      <input type="number" name="original_price" value={product.original_price} onChange={handleChange} placeholder="Original Price" required />
      <input type="number" name="offer_price" value={product.offer_price} onChange={handleChange} placeholder="Offer Price" required />
      
      <input type="file" name="images" onChange={handleFileChange} />
      
      <h4>Seller Details</h4>
      <input type="text" name="name" value={product.seller.name} onChange={handleSellerChange} placeholder="Seller Name" required />
      <input type="file" name="logo" onChange={handleFileChange} />
      <input type="number" name="rating" value={product.seller.rating} onChange={handleSellerChange} placeholder="Seller Rating" required />
      <input type="text" name="warranty_offer" value={product.seller.warranty_offer} onChange={handleSellerChange} placeholder="Warranty Offer" required />


      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
