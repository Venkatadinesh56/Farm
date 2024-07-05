import React, { useState, useEffect } from 'react';
import './OrderTracking.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const OrderTracking = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const today = new Date().toLocaleDateString('en-GB');
  const futureday = new Date(new Date(order.orderDate).setDate(new Date(order.orderDate).getDate() + 4)).toLocaleDateString('en-GB');
  const email = localStorage.getItem('email');
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [selectedStep, setSelectedStep] = useState('Order Placed');
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/completed`, {
        email
      });
      alert('Your order has been successfully cancelled.');
    } catch (error) {
      console.error('Failed to cancel order', error.response ? error.response.data : error);
      alert('Failed to cancel order');
    }
  };

  const todayDate = parseDate(today);
  const futureDate = parseDate(futureday);

  // Calculate the difference in time
  const differenceInTime = futureDate - todayDate; // Difference in milliseconds

  // Convert the difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  useEffect(() => {
    if (differenceInDays === 0) {
      handleCancelOrder(order._id);
    }
    if (differenceInDays <= 2) {
      setOrderDispatched(true);
      setOrderCompleted(differenceInDays <= 0);
    } else if (differenceInDays > 2) {
      setOrderDispatched(false);
      setOrderCompleted(false);
    }

    if (differenceInDays <= 0) {
      // Update backend as completed
      axios.put(`http://localhost:5000/api/orders/${order._id}/completed`, {
        email
      }).then(response => {
        console.log('Order marked as completed');
      }).catch(error => {
        console.error('Failed to update order as completed', error.response ? error.response.data : error);
      });
    }
  }, [differenceInDays, order._id, email]);

  const handleClick = (step) => {
    setSelectedStep(step);
    if (step === 'Completed') {
      setShowShippingAddress(true);
    } else {
      setShowShippingAddress(false);
    }
  };

  const getStepClass = (step) => {
    if (step === 'Order Placed') {
      return 'active completed';
    }
    if (step === 'In Transit' && orderDispatched) {
      return 'active completed';
    }
    if (step === 'Completed' && orderCompleted) {
      return 'active completed';
    }
    return '';
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="tracking-header">
          <div className="tracking-info">
            <span><font style={{ color: "red" }}>Order Tracking </font>:-{order._id}</span>
            <span><font style={{ color: "red" }}>Shipped via </font>{order.paymentDetails.paymentType}</span>
            <span><font style={{ color: "red" }}>Status: </font> {order.orderStatus}</span>
            <span><font style={{ color: "red" }}>Expected:</font>  {futureday}</span>
           
          </div>
        </div>
       
        <div className="steps">
          <div
            className={`step ${getStepClass('Order Placed')}`}
            onClick={() => handleClick('Order Placed')}
          >
            <div className="step-icon">✓<i className="fas fa-shopping-basket"></i></div>
            <p>Order Processed</p>
          </div>
          <div
            className={`step ${getStepClass('In Transit')}`}
            onClick={() => handleClick('In Transit')}
          >
            {orderDispatched ? (
              <div className="step-icon">✓<i className="fas fa-shopping-basket"></i></div>
              
            ) : (
              <div className="step-icon">👤<i className="fas fa-truck"></i></div>
            )}
            <p>Order Dispatched</p>
          </div>
          <div
            className={`step ${getStepClass('Completed')}`}
            onClick={() => handleClick('Completed')}
          >
            {orderCompleted ? (
              <div className="step-icon">✓<i className="fas fa-check-circle"></i></div>

            ) : (
              <div className="step-icon">📦<i className="fas fa-check-circle"></i></div>
            )}
            <p>Order Delivered</p>
          </div>
        </div>
        {showShippingAddress && (
          <div className="shipping-address">
          {orderCompleted  &&(
            <h4>Your Order Has Been Delivered..!</h4>

            )
          }
            
            <h3>Shipping Address</h3>
            <p><b>Name:</b>{order.address.name}</p>
            <p><b>Address:</b>{order.address.houseNumber},{order.address.landmark},{order.address.area},{order.address.town},{order.address.state},{order.address.pincode}</p>
            <p><b>Phone:</b> {order.address.number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
