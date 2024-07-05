import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cancel.css';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          params: { email }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, [email]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        email
      });
      const updatedOrder = response.data;

      setOrders((prevOrders) => 
        prevOrders.map((order) => 
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );

      alert('Your order has been cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel order', error.response ? error.response.data : error);
      alert('Failed to cancel order');
    }
  };

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        [...orders].reverse().map(order => ( // Reversing the orders array
          <div key={order._id} className="order-card">
            <div className="order-header" style={{ position: "relative", top: "10px" }}>
              <span className='textorder'>Order ID: {order._id}</span>
              <span className='textorder'>Ordered Date: {new Date(new Date(order.orderDate).setDate(new Date(order.orderDate).getDate() )).toLocaleDateString('en-GB')}</span>
              <span className='textorder'>Total: &#8377;{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="order-items">
              {order.product.map((item, index) => (
                <div key={index} className="order-item">
                  <table width={"100%"} border={"1px"}>
                    <tr>
                      <td style={{ width: "400px" }}>
                        <span>{item.name}(&#8377;{item.MRP})</span>
                      </td>
                      <td><span>Quantity: {item.Quantity || 1}</span></td>
                      <td><span>Price: &#8377;{item.MRP * item.Quantity}</span></td>
                    </tr>
                  </table>
                </div>
              ))}
              <hr />
            </div>
            <div className="order-detailssk">
              <p><font style={{ color: "red" }}>Shipping Address:</font> {order.address.name}, {order.address.number}, {order.address.landmark}, {order.address.area}, {order.address.town}, {order.address.state}, {order.address.pincode}</p>
              <p><font style={{ color: "red" }}>Payment Method:</font> {order.paymentDetails.paymentType}</p>
              <p><font style={{ color: "red" }}>Tracking Number:</font> {order._id}</p>
              <p><font style={{ color: "red" }}>Customer Notes:</font> Happy shopping</p>
            </div>
            <div className="order-actions">
              {order.orderStatus !== 'Cancelled' && (
                <button className="track-button" onClick={() => navigate("/ordertracking", { state: { order } })}>Track</button>
              )}

              {order.orderStatus === 'In Progress' && (
                <button className='cancel-button' onClick={() => handleCancelOrder(order._id)}>Cancel</button>
              )}
              {order.orderStatus === 'Completed' && (
                <button className='cancel-button' style={{ backgroundColor: "green" }}>Complete</button>
              )}
              {order.orderStatus === 'Cancelled' && (
                <button className="cancel-button" style={{ backgroundColor: "gray" }}>Cancelled</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cancel;
