import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userddata } from './userdetails';

const PaymentPage = () => {
    const location = useLocation();
    const { address, total, product } = location.state || {};
    const [paymentType, setPaymentType] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: ''
    });
    const navigate=useNavigate();

    const gst = total * 0.02;
    const shipping = total < 500 ? 50 : 0;
    const finalAmount = total + gst + shipping;

    const [upiId, setUpiId] = useState('');

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
    };

    const handleCardDetailsChange = (event) => {
        const { name, value } = event.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleUpiIdChange = (event) => {
        setUpiId(event.target.value);
    };

    const handlePay = async () => {
        const paymentDetails = {
            paymentType,
            cardDetails: paymentType === 'card' ? cardDetails : null,
            upiId: paymentType === 'upi' ? upiId : null
        };

        const orderData = {
            product,
            address,
            paymentDetails,
            totalAmount: finalAmount,
            orderDate: new Date().toISOString(),
            orderStatus: 'In Progress' // Initial order status
        };

        try {
            const email=localStorage.getItem('email');
            const response = await axios.post('http://localhost:5000/api/orders', {orderData,email});
            alert('Order placed successfully');
            navigate("/Home");
        } catch (error) {
            alert('Failed to place order');
            console.error(error);
        }
    };

    return (
        <div className="containerk">
            <div className="payment-container">
                <div className="payment-section">
                    <div className="address-section">
                        <h2>1. Selected Address</h2>
                        <p id="selected-address">
                            {address.name}<br />
                            {address.houseNumber}<br />
                            {address.area}<br />
                            {address.landmark}<br />
                            {address.town}, {address.state}, {address.place}<br />
                            {address.number}
                        </p>
                    </div>
                    <h2>2. Select Payment Type</h2>
                    <div className="payment-options">
                        <label>
                            <input type="radio" name="payment-type" value="card" onChange={handlePaymentTypeChange} /> Card
                        </label>
                        <label>
                            <input type="radio" name="payment-type" value="upi" onChange={handlePaymentTypeChange} /> UPI
                        </label>
                        <label>
                            <input type="radio" name="payment-type" value="cod" onChange={handlePaymentTypeChange} /> Cash on Delivery
                        </label>
                    </div>
                    <div id="payment-details">
                        {paymentType === 'card' && (
                            <div className="card-details">
                                <input
                                    style={{ width: "95%" }}
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardDetailsChange}
                                />
                                <input
                                    style={{ width: "95%" }}
                                    type="text"
                                    name="cardHolderName"
                                    placeholder="Card Holder Name"
                                    value={cardDetails.cardHolderName}
                                    onChange={handleCardDetailsChange}
                                />
                                <input
                                    style={{ width: "95%" }}
                                    type="text"
                                    name="expiryDate"
                                    placeholder="Expiry Date (MM/YY)"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardDetailsChange}
                                />
                                <input
                                    style={{ width: "95%" }}
                                    type="password"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={cardDetails.cvv}
                                    onChange={handleCardDetailsChange}
                                />
                                <button onClick={handlePay} className="pay-button">Pay ₹{finalAmount}</button>
                            </div>
                        )}
                        {paymentType === 'upi' && (
                            <div className="upi-details">
                                <input
                                    style={{ width: "97%" }}
                                    type="text"
                                    name="upiId"
                                    placeholder="UPI ID"
                                    value={upiId}
                                    onChange={handleUpiIdChange}
                                />
                                <button onClick={handlePay} className="pay-button">Pay ₹{finalAmount}</button>
                            </div>
                        )}
                        {paymentType === 'cod' && (
                            <div className="cod-details">
                                <button onClick={handlePay} className="pay-button">Pay ₹{finalAmount}</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <p>Item Cost: ₹{total}</p>
                    <p>Shipping: ₹{shipping}</p>
                    <p>GST: ₹{gst}</p>
                    <hr />
                    <h3>Total: ₹{finalAmount}</h3>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
