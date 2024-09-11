
import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Product Listing</h1>
      <ProductList />
      <ProductForm />
    </div>
  );
}

export default App;
