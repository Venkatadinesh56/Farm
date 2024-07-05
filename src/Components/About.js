import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <center>
        <h1>About Us<hr /></h1>
      </center>
      <br />
      <div className="aboutus-text">
        <center>
          Life is becoming ever faster and shorter. And with this ever-increasing pace, all across the globe more and more people are realizing that there is no better way to achieve the forgotten balance than with a piece of nature: home grown, masterly produced, infused with love and compassion. We realized that carbide Mangoes from markets make you worrying always the same, boring and dull taste.
          <br /><br />
          MangoFarm is well known for its unique taste and quality which makes you additive to have over and over again. Stop fighting for Mango this time. Here is a simple solution with great results go online for carbide free natural farm fresh handpicked Mangoes! An even simpler solution is to just click and place the Alphonso, the most authentic specialty our land offered are ready to be shipped to your door steps!
          <br /><br />
        </center>
        <h3>Economical Prices</h3>
        <p>
          MangoFarm.com aims at eliminating the middleman completely from the mango supply chain and brings the produce directly from farmers to consumers. We ensure for consumer to get the best quality of natural Farm Fresh handpicked Mangoes and thus ensuring value for your money and live a better happy life.
        </p>
        <br /><br />
        <div className="aboutus-list">
          <img className="aboutus-img" src="https://assets.zeezest.com/blogs/PROD_Mango%20banner_1688977524542.png" alt="Mango banner" />
          <ol>
            <li>100% Natural and direct from Farm, Chemical-free and handpicked</li>
            <li>Mangoes are naturally ripened by using traditional technique</li>
            <li>Economical Prices</li>
            <li>Order mangoes online with MangoFarm.com for the fastest home delivery.</li>
            <li>Online Payment and All India shipping for all orders</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default About;
