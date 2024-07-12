import React from 'react'
import './Shipping.css';

const Ship = () => {
  return ( 
    <div className='ship-container'>
     <main>
      <div className='ship-head'>
        <h1 style={{position:"relative",top:"10px",left:"-40px"}}>
          Shipping Policy
        </h1>
      </div>
    <section className="shipping-policy">
      <div className="shipping-content">
      </div>
    </section>
    <section className="shipping-details">
    <h2>Where do we ship?</h2>
        <p>MangoFarm, a product by Shriven, ships its products across the city of Tirupati. While we make all
          efforts to cover every part of the city, we notify you of any exceptions based on the shipping
          address provided.</p>
          
      <h2>How long does the shipping take?</h2>
      <p>All the products will be delivered within 2-3 days from the date of order. We harvest based on the orders
        received and handled or processed or ripened naturally at our state of art facility, hence we will need
        this time to ensure that direct farm fresh products are delivered to you. The products once dispatched
        from our facility usually arrives on the same day and is delivered within 48 hours. MangoFarm a Product
        by Shriven strives to meet the preferred time of the delivery, but do not guarantee the exact time of
        the delivery due to factors outside our control.</p>
      <h2>How do I track my order?</h2>
      <p>Post order, we will email you an order confirmation. Once the order is processed, we will email and SMS
        you the order updates regularly. Please reach out to us through Contact Us page for any questions
        regarding the shipping and delivery timelines.</p>
    </section>
  </main>
</div>

  )
}

export default Ship