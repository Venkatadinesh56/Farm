import React, { useState } from 'react';

import './TemplePage.css'; // Import CSS file for styling
import axios from 'axios';

const TemplePage = () => {
  const [visibleContent, setVisibleContent] = useState({});
  const [data,setData]=useState([]);

  const toggleContent = (id) => {
    setVisibleContent((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
 
  const fetchdata= async ()=> {
    try {
      const response = await axios.get('http://localhost:5000/tdata');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }

  fetchdata();

  return (
    <div className="temple-page">
      {data.map((temple) => (
        <div key={temple.Id} className="temple-card">
          <h2 className="temple-name">{temple.temple_name}</h2>
          <div className="temple-content">
            <div className="temple-images">
              <img
                src={temple.imgurl1}
                alt={`${temple.temple_name} - 1`}
                className="temple-image"
              />
              
              {visibleContent[temple.Id] && (
                
                <img 
                  src={temple.imgurl2}
                  alt={`${temple.temple_name} - 2`}
                  style={{}}
                />
              )}
            </div>
            <div className={`temple-details ${visibleContent[temple.Id] ? 'expanded' : ''}`}>
              <p className="temple-legend">
                {temple.temple_legend}
              </p>
              {visibleContent[temple.Id] && (
                <>
                  <div className="section">
                    <h3 className="section-title">Significance</h3>
                    <p className="section-content">{temple.significance}</p>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Timings</h3>
                    <p className="section-content"><strong>Mon - Thurs:</strong> {temple.timings_mon_thrus}</p>
                    <p className="section-content"><strong>Friday:</strong> {temple.timings_fri}</p>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Annaprasadam</h3>
                    <p className="section-content">{temple.annaprasadam_details}</p>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Contact Details</h3>
                    <p className="section-content">{temple.contact_details}</p>
                  </div>

                  <div className="section">
                    <h3 className="section-title">Google Maps Location</h3>
                    <iframe
                      title={`${temple.temple_name} Map`}
                      src={temple['Google Maps Location']} // Accessing Google Maps Location from data
                      width="100%"
                      height="300"
                      className="map-frame"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </>
              )}
              <button className="read-more-btn" onClick={() => toggleContent(temple.Id)}>
                {visibleContent[temple.Id] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplePage;
