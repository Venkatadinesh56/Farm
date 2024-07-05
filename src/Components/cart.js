import './cart.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userddata } from './userdetails';
function Cart() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartData = async () => {
    try {
      const email = localStorage.getItem('email');// Assuming userddata contains the user's email
      const response = await axios.get(`http://localhost:5000/cart/${email}`);
      
      setCartData(response.data);
      calculateTotal(response.data);
      
      console.log('Cart Items:', response.data);
      // Handle the response data here
      
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error scenarios
    }
  };
  

  useEffect(() => {
    fetchCartData();
  }, []);

  const calculateTotal = (data) => {
    const totalAmount = data.reduce((acc, item) => acc + item.MRP * (item.Quantity || 1), 0);
    setTotal(totalAmount);
  };

  const handleUpdateSubmit = async (index, quantity) => {
    const id = cartData[index]._id;

    const table = localStorage.getItem('email');// Assuming userddata holds the user's email
  
    try {
      await axios.put(`http://localhost:5000/cart/${id}`, { quantity, table });
      console.log("Item quantity updated successfully");
      fetchCartData(); // Fetch updated cart data after updating
    } catch (error) {
      console.error('Error updating item quantity', error);
      // Handle error scenarios
    }
  };
  
  
  const handleQuantityChange = (index, quantity) => {
    const newCartData = [...cartData];
    newCartData[index].Quantity = quantity;
    setCartData(newCartData);
    calculateTotal(newCartData);
    handleUpdateSubmit(index, quantity); // Ensure quantity update is submitted
  };

  const handleDeleteItem = async (index) => {
    const id = cartData[index]._id;
    const email = localStorage.getItem('email'); // Assuming userddata contains the user's email
  
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${id}`, {
        data: { email } // Pass the email in the request body
      });
      console.log(response.data.message); // Log success message from the backend
      alert("Cart item deleted successfully.");
      await fetchCartData(); // Update cart data after deletion
    } catch (error) {
      console.error('Error deleting cart item:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      alert("Error deleting cart item. Please try again later.");
    }
  };
  
  

 

  const addressk = () => {
    fetchCartData();
    navigate('/ShippingAddress', { state: { total, product: cartData } });
  };

  const returnToHome = () => {
    navigate('/Products');
  };

  return (
    <div className='cart-container'>
      <div className="cart-wrapper">
        <div className="cart-header">
          <center>
            <h1 style={{ color: "orange" }}>Shopping Cart</h1>
            <hr />
          </center>
        </div>

        {cartData.length === 0 ? (
          <center>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="Empty Cart" />
          </center>
        ) : (
          cartData.map((item, index) => (
            <div key={index} className='cart-item'>
              <div className='cart-container'>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th width="20%"></th>
                      <th width="26%">Product</th>
                      <th width="18%">Price</th>
                      <th width="18%">Quantity</th>
                      <th width="18%">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={2}><img className="cart-image" src={item.imgurl1} alt={item.name} /></td>
                      <td>{item.name}</td>
                      <td>₹{item.MRP}</td>
                      <td>
                        <input
                          style={{ width: "100%", textAlign: "center" }}
                          type="number"
                          min="1"
                          value={item.Quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                        />
                      </td>
                      <td>₹{item.MRP * (item.Quantity || 1)}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="update-button-cell">
                        <button className='update-cart-button' onClick={() => handleDeleteItem(index)}>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h2>Cart Total</h2>
        <div>
          <span className="cart-left-text">Subtotal:</span>
          <span className="cart-right-text">₹{total}</span>
        </div>
        <div className="shipping">
          <span className="cart-left-text">Shipping:</span>
          <span className="cart-right-text">Enter your address to view shipping options | Calculate shipping</span>
        </div>
        <br />
        <div className="total-final">
          <span className="cart-left-text">Total:</span>
          <span className="cart-right-text">₹{total}</span>
        </div>
        <center>
          <button onClick={returnToHome}>Back to Home</button><br /><br />
          <button onClick={addressk}>Proceed to Checkout ({cartData.length})</button>
        </center>
      </div>
    </div>
  );
}

export default Cart;
