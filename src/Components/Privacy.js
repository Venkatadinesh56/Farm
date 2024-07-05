
import React from 'react';
import './Privacy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <header className="privacy-header">
        <h1 style={{position:"relative",left:"650px"}}>Privacy Policy</h1>
      </header>
      <main className="privacy-content">
        <section>
          <h2>Introduction</h2>
          <p>Welcome to Mango Farm. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information.</p>
        </section>
        <section>
          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, postal address, phone number, and other personal details.</li>
            <li><strong>Usage Data:</strong> Information on how you use our website, including your IP address, browser type, and browsing behavior.</li>
          </ul>
        </section>
        <section>
          <h2>How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process transactions</li>
            <li>Send promotional materials and updates</li>
            <li>Respond to customer service requests</li>
            <li>Analyze website usage and trends</li>
          </ul>
        </section>
        <section>
          <h2>How We Protect Your Information</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
        </section>
        <section>
          <h2>Third-Party Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
        </section>
        <section>
          <h2>Your Consent</h2>
          <p>By using our site, you consent to our website's privacy policy.</p>
        </section>
        <section>
          <h2>Changes to Our Privacy Policy</h2>
          <p>If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.</p>
        </section>
        <section>
          <h2>Contacting Us</h2>
          <p>If there are any questions regarding this privacy policy, you may contact us using the information below:</p>
          <address>
            Mango Farm<br />
            Email: <a href="mailto:info@mangofarm.com">info@mangofarm.com</a><br />
            Address: Varadha raja nagar, Tirupati, Andhra Pradesh
          </address>
        </section>
      </main>
    </div>
  );
}
