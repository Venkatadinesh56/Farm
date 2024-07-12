import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './productDetail.css';
import axios from 'axios';

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, productdata } = location.state || {};

  if (!product) {
    navigate("/");
  }

  const addtocart = (product) => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert("Please log in first");
    } else {
      addProductToCart(product);
      navigate("/Cart");
    }
  };

  const addProductToBuy = (product) => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert("Please log in first");
    } else {
      navigate("/Buyproduct", { state: { product } });
    }
  };

  const addProductToCart = async (product) => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert("Please log in first");
      return;
    }

    try {
      // Check if product already exists in productdata
      const productExists = productdata.some((item) => item.name === product.name);

      if (!productExists) {
        // Post the product data
        await axios.post('http://localhost:5000/users', { product });
        console.log("Submitted successfully");

        // Navigate to cart page
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      <h1 className='product-detail-header'><center>Product Details</center></h1>
      <div className="product-detail">
        <div className="product-info">
          <div className='product-details-container'>
            <div className="product-image-container">
              <img width="400px" height="400px" src={product.imgurl1} alt={product.name} />
            </div>
            <div className="additional-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">&#8377; {product.MRP}</p>
              <p><strong>Packaging:</strong> {product.Packaging}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Discount:</strong> {product.discount_percent}</p>
              <p><strong>Country of Origin:</strong> {product.country_of_origin}</p>
              <p><strong>Storage:</strong> {product.storage}</p>
              <p><strong>Quantity:</strong> {product.Quantity}</p>
              <p><strong>Product Form:</strong> {product.Product_Form}</p>
              <button className="add-to-cart-button" onClick={() => addtocart(product)}>Add to Cart</button>
              <button className='buy-now-button' onClick={() => addProductToBuy(product)}>Buy Now</button>
            </div>
          </div>
        </div>

        <div className="product-description-container">
          <h3>Introduction</h3>
          <p className="product-introduction-container">{product.introduction}</p>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
