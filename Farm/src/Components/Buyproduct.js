import './cart.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Buyproduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (product) {
      setCartProduct([product]);
    }
  }, [product]);

  useEffect(() => {
    if (cartProduct.length > 0) {
      calculateTotal(cartProduct[0]);
    }
  }, [cartProduct]);

  const calculateTotal = (product) => {
    const totalAmount = product.MRP * (product.Quantity || 1);
    setTotal(totalAmount);
  };

  const handleQuantityChange = (quantity) => {
    const updatedProduct = { ...cartProduct[0], Quantity: quantity };
    setCartProduct([updatedProduct]);
    calculateTotal(updatedProduct);
  };

  const handleDeleteItem = () => {
    setCartProduct([]);
    setTotal(0);
  };

  const returnToHome = () => {
    navigate('/Products');
  };

  const addressk = () => {
    navigate('/ShippingAddress', { state: { total, product: cartProduct } });
  };

  return (
    <div className='cart-container'>
      <div className="cart-wrapper">
        <div className="cart-header">
          <center>
            <h1 style={{ color: "orange" }}>Buy products</h1>
            <hr />
          </center>
        </div>

        {cartProduct.length === 0 ? (
          <center>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="Empty Cart" />
          </center>
        ) : (
          <div className='cart-item'>
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
                    <td rowSpan={2}><img className="cart-image" src={cartProduct[0].imgurl1} alt={cartProduct[0].name} /></td>
                    <td>{cartProduct[0].name}</td>
                    <td>₹{cartProduct[0].MRP}</td>
                    <td>
                      <input
                        style={{ width: "100%", textAlign: "center" }}
                        type="number"
                        min="1"
                        value={cartProduct[0].Quantity || 1}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      />
                    </td>
                    <td>₹{cartProduct[0].MRP * (cartProduct[0].Quantity || 1)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="update-button-cell">
                      <button className='update-cart-button' onClick={handleDeleteItem}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
          <button onClick={addressk}>Proceed to Checkout (1)</button>
        </center>
      </div>
    </div>
  );
}

export default Buyproduct;
