import React from 'react';
import './Disclaimer.css';

export default function Disclaimer() {
  return (
    <div className="disclaimer-container">
      <header className="disclaimer-header">
      <center>  <h1 style={{position:"relative",left:"650px"}}>Disclaimer</h1></center>
      </header>
      <main className="disclaimer-content">
        <section style={{position:"relative",top:"-10px"}}>
          <h2>WEBSITE DISCLAIMER</h2>
          <p>The information contained in this website is for general information purposes only. The information is provided by www.MangoFarm.in, a property of Gangaaram Technologies Private Limited. While we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

          <p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>

          <p>Through this website you are able to link to other websites which are not under the control of Gangaaram Technologies Private Limited. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>

        
        
        </section>
        
      </main>
    </div>
  );
}
