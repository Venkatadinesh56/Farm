import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';


function Contact() { 
  return (
    <div className='contact-form-container'>
        <h1 className='contact-heading'>Get in Touch With Us</h1>
        <div className='contact-form-sub-container'>
          
        <div >
        <div className="card-container">
            <div className="card">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
              <p>Location: Tirupati, Andhra Pradesh, INDIA</p>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
              <p>Mobile: +1 234 567 890</p>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <p>Email: example@example.com</p>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faGlobe} size="2x" />
              <p>Website: www.example.com</p>
            </div>
        </div>
    </div>
          
        </div>
        <div className='contact-form-map-container'>
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124079.7457200743!2d79.34392840228001!3d13.627805664979519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0f88620427%3A0xcf4152d1daca0cac!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1717567657214!5m2!1sen!2sin" 
              width="500px" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </div>
  );
}

export default Contact;
