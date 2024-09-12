import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'

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
    console.log('File selected:', files[0]);
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
      formData.append('logo', product.seller.logo);
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
    <div class = 'form'>
    
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div class='Productdisplay'>
      <h4>ADD PRODUCT</h4>
      <input class='productinput' type="text" name="title" value={product.title} onChange={handleChange} placeholder="Title" required />
      <textarea class='productinput' name="description" value={product.description} onChange={handleChange} placeholder="Description" required></textarea>
      <input class='productinput' type="number" name="original_price" title='Decimal Only' value={product.original_price} onChange={handleChange} placeholder="Original Price" required />
      <input class='productinput' type="number" name="offer_price" title='Decimal Only' value={product.offer_price} onChange={handleChange} placeholder="Offer Price" required />
      <div class='postimage'>
      <label>Product Image:</label>
      <input class='formproductimg' type="file" name="images" onChange={handleFileChange} /></div></div>
      
      <div class='seller'>
      <h4>Seller Details</h4>
      <input class='productinput' type="text" name="name" value={product.seller.name} onChange={handleSellerChange} placeholder="Seller Name" required />
      <input class='productinput' type="number" name="rating" value={product.seller.rating} onChange={handleSellerChange} title='Range: 0.0 - 5.0' placeholder="Rating Ex:4.5" required />
      <input class='productinput' type="text" name="warranty_offer" value={product.seller.warranty_offer} onChange={handleSellerChange} placeholder="Warranty Offer Ex:2year" required />
      <div class='postimage'>
      <label>Product Image:</label>
      <input class='formproductimg' type="file" name="logo" onChange={handleFileChange} />
      </div>
      </div>
      <div class = 'createbutton'>

      <button class="btn" type='submit'>
        <span>
          Create
        </span>
      </button>
      </div>
    </form>
    </div>
  );
};

export default ProductForm;
