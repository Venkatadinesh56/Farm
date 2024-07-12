import React, { useState, useEffect } from 'react';
import details from './cartdatafile';
import './Product.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import verify from './verify';
import { userddata } from './userdetails';

const ProductList = () => {
  const navigate = useNavigate();
  const [productdata, setProductdata] = useState([]);
  const [products, setProducts] = useState([]);
  const email = localStorage.getItem('email');

  // Fetch cart data and product data from the server
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${email}`);
      setProductdata(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pdetails');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchCartData();
    }
    fetchProductData();
  }, [email]);

  // Function to add product to cart
  const addProductToCart = async (product) => {
    if (!localStorage.getItem('email')) {
      alert("Please log in first");
      return; // Exit early if not logged in
    }

    try {
      const productExists = productdata.some((item) => item.name === product.name);
      if (productExists) {
        navigate("/cart");
        return;
      }

      const table = localStorage.getItem('email');
      const { name, imgurl1, imgurl2, stock, introduction, description, Packaging, Package, Quantity, MRP, discount_percent, bought, storage, country_of_origin, for_sale } = product;

      await axios.post('http://localhost:5000/users', { table, name, imgurl1, imgurl2, stock, introduction, description, Packaging, Package, Quantity, MRP, discount_percent, bought, storage, country_of_origin, for_sale });
      console.log("Product added successfully to cart");

      // Add product to details (assuming details is an array in memory)
      details.push(product);

      // Navigate to cart page
      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Function to navigate to Buy Product page
  const addProductToBuy = (product) => {
    if (!localStorage.getItem('email')) {
      alert("Please log in first");
    } else {
      navigate("/Buyproduct", { state: { product } });
    }
  };

  // Function to navigate to Product Detail page
  const viewProductDetail = (product) => {
    const productExists = details.some((item) => item.name === product.name);
    if (!productExists) {
      details.push(product);
    }
    navigate("/productDetail", { state: { product, productdata } });
  };

  // Function to navigate to Cart page
  const navigateToCart = () => {
    if (!localStorage.getItem('email')) {
      alert("Please log in first");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.Id} className="product-card">
          <button
            style={{ height: "344px", border: "none", backgroundColor: "white" }}
            onClick={() => viewProductDetail(product)}
          >
            <img src={product.imgurl1} alt={product.name} className="product-image" />
          </button>
          <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-packaging">Packaging: {product.Packaging}</div>
            <div className="product-mrp">&#8377; {product.MRP}</div>
            <button className="add-to-cart-button" onClick={() => addProductToCart(product)}>
              Add to Cart
            </button>
            <button className="buy-now-button" onClick={() => addProductToBuy(product)}>Buy Now</button>
          </div>
        </div>
      ))}
      <div className="cart-icon">
        <center>
          <button onClick={navigateToCart} style={{ border: "none", background: "none" }}>
            <img
              width={"30px"}
              style={{ position: "relative", top: "10px", left: "0px" }}
              src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png"
              alt="Cart"
            />
          </button>
        </center>
      </div>
    </div>
  );
};

export default ProductList;
