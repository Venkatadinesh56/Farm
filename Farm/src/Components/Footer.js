import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <img style={{position:"relative",left:"90px"}} src="https://www.logolynx.com/images/logolynx/s_b4/b4e02777350c75ed796f46b7faf00ce8.png" alt="Logo" className="logo" />
        <span><h2>Mango Farm</h2></span>
        </div>
        <div className="footer-section">
        <h4>Information</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/About">About Us</a></li>
          <li><a href="/Gallery">Gallery</a></li>
          <li><a href="/Goshala">Goshala</a></li>
          <li><a href="/Blog">Blog</a></li>
          <li><a href="/Products">Products</a></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/Terms">Terms and Conditions</a></li>
          <li><a href="/Privacy">Privacy Policy</a></li>
          <li><a href="/Ship">Shipping Policy</a></li>
          <li><a href="/Disclaimer">Disclaimer</a></li>
          <li><a href="/Contact">Contact Us</a></li>
        </ul>
      </div>
      <div className="social-media">
      <h4>Social Media</h4>
      <div className="social-icons">
        <a href="https://www.facebook.com/"><img className='Social'
            src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/83-facebook-512.png" alt="Facebook"/ ></a>
        <a href="https://www.instagram.com/"><img className='Social'
            src="https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg?w=740&t=st=1717753258~exp=1717753858~hmac=6981bac6a9ccf902a6185cf501146a870730a9d19d51be5c322d831de76267ee=" alt="Instagram" /></a>
        <a href="https://x.com/"><img className='Social'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJO2SeTQHtzL024EkApdOOoQ1QlTxBsqKCSQ&s" alt="Twitter" /></a>
        <a href="https://www.youtube.com/"><img className='Social'
            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" /></a>
      </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Mango Farm. All rights reserved.</p>
      </div>
      
    </footer>
  );
};

export default Footer;