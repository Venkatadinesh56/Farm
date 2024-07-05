import './cancel_form.css';
import { useState } from 'react';

function Cancel_form() {
  const [reasons, setReasons] = useState("");

  const handleInputChange = (e) => {
    setReasons(e.target.value);
  };
  function submitsuccessfully(){
    if(reasons==="")
        {
            alert("please enter the reason for the cancellation")
        }
        else{
            alert("Your order is successfully Cancel");

        }
  }

  return (
    <div>
      <h1 className="header">
        <center>Cancel the order</center>
      </h1>
      <div className="cancel_form_container">
        <label>Order Name:</label>
        <br /><br />
        <label>Shipping ID:</label>
        <br /><br />
        <label>Reason for Order Cancellation:</label>
        <br />
        <input
          className="cancel_order_reason"
          type="text"
          placeholder="Enter the reason in 3 to 4 words"
          value={reasons}
          onChange={handleInputChange}
        />
        <div className="button-container">
          <button onClick={() => setReasons("I have changed my mind")}>I have changed my mind</button>
          <button onClick={() => setReasons("I want to change address for the order")}>I want to change address for the order</button>
          <button onClick={() => setReasons("I want to convert my order into prepaid")}>I want to convert my order into prepaid</button>
          <button onClick={() => setReasons("Price for the product has decreased")}>Price for the product has decreased</button>
          <button onClick={() => setReasons("Expected delivery time is very long")}>Expected delivery time is very long</button>
          <button onClick={() => setReasons("I want to cancel due to product quality issues")}>I want to cancel due to product quality issues</button>
        </div>
        <br />
        <button className="cancel_order_submit" onClick={submitsuccessfully}>Submit</button>
        <br />
      </div>
    </div>
  );
}

export default Cancel_form;
