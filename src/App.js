
import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';
import Navbar from './components/navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <ProductList />
      <ProductForm />
    </div>
  );
}

export default App;
