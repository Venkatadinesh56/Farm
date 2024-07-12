import React from 'react';
import './contactForm.css';

function ContactForm() { // Changed to PascalCase for the component name
  return (
    <div className='contact-form-container'>
        <h1 className='contact-heading'>Get in Touch With Us</h1>
        <div className='contact-form-sub-container'>
          <div className='contact-form-left'>
              <img src='https://img.freepik.com/premium-vector/envelope-opens-bank-report-coming-out-from-it-vector-illustration_714615-15.jpg?w=360' alt='envelope-icon' />
          </div>
          <div className='contact-form-right'>
                <input type='text' placeholder='First Name' onChange={(e) => e.target.value}></input> <br/>
                <input type='text' placeholder='Last Name' onChange={(e) => e.target.value}></input> <br/>
                <input type='email' placeholder='email' onChange={(e) => e.target.value}></input> <br/>
                <textArea placeholder='your Questions...' onChange={(e) => e.target.value} rows='5' columns='20'></textArea>
                <button>SEND MESSAGE</button>
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

export default ContactForm;
