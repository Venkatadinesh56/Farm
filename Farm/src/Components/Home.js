import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import MangoFarm from '../assets/MangoFarm.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Video from "../assets/Mango.mp4";
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Home() {
  const formRef = useRef(null);
  const [hideVisit, setHideVisit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [visiter_day, setVisiter_day] = useState("");
  const [visiter_time, setVisiter_time] = useState("");
  const [visiter_name, setVisiter_name] = useState("");
  const [visiter_email, setVisiter_email] = useState("");
  const [visiter_number, setVisiter_number] = useState("");
  const [vister_reason, setVisiter_reason] = useState("");
  const [vister_address, setVisiter_address] = useState("");
  const [visiter_gender, setVisiter_gender] = useState("");
  const [visiter_transport, setVisiter_transport] = useState("");
  const [visiter_message, setVisiter_message] = useState("");
  const [visiter_district, setVisiter_district] = useState("");
  const [visiter_state, setVisiter_state] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setHideVisit(false);
    }
  };

  const handleVisitClick = () => {
    setHideVisit(true);
  };

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    const today = new Date();

    // Check if the clicked date is in the future relative to the current date
    if (clickedDate >= today.setHours(0, 0, 0, 0)) {
      setSelectedDate(clickedDate);
      setVisiter_day(clickedDate);
    } else {
      // Optionally provide feedback that past dates are not selectable
      console.log("Please select a date from today onwards.");
    }
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setVisiter_time(timeSlot);
  };

  const handleNextClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitorData = {
      visiter_day,
      visiter_time,
      visiter_name,
      visiter_email,
      visiter_number,
      vister_reason,
      vister_address,
      visiter_gender,
      visiter_transport,
      visiter_message,
      visiter_district,
      visiter_state,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/visit', visitorData);
      console.log(response.data);

      // Clear form fields and reset state after successful submission
      setVisiter_day("");
      setVisiter_time("");
      setVisiter_name("");
      setVisiter_email("");
      setVisiter_number("");
      setVisiter_reason("");
      setVisiter_address("");
      setVisiter_gender("");
      setVisiter_transport("");
      setVisiter_message("");
      setVisiter_district("");
      setVisiter_state("");
      setSelectedDate(null);
      setSelectedTimeSlot("");
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
    setHideVisit(false);
    alert("The data is submitted");
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return '';
    }
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Function to add custom class names for non-selectable dates
  const eventClassNames = ({ start }) => {
    const today = new Date();
    return start < today.setHours(0, 0, 0, 0) ? 'non-selectable' : '';
  };

  // Function to determine if a time slot is in the future
  const isFutureTimeSlot = (timeSlot) => {
    if (!selectedDate) return false;
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':');
    let slotDate = new Date(selectedDate);
    slotDate.setHours(
      period === 'PM' ? parseInt(hours) + 12 : parseInt(hours),
      parseInt(minutes)
    );
    return slotDate > new Date();
  };

  return (
    <div className="home-page">
      <main className="main-content">
        <div className='wholewrapbox'>
          <section className="hero-section">
            <div className="image-container">
              <img src={MangoFarm} alt="MangoFarm" />
            </div>
            <div className="text-container">
              <img className='mangotext' width={"30%"} src="https://i.pinimg.com/736x/ec/9b/e9/ec9be9da32b0fa19b6f4f0acab4b5119.jpg" alt="Logo" />
              <h2>Welcome to Mango Farm</h2>
              <p>Discover the finest mangoes straight from our farm to your table. Our mangoes are hand-picked and delivered fresh.</p>
            </div>
          </section>
          <section className="video-section">
            <h3>Our Farm Video</h3>
            <div className="video-container">
              <video autoPlay loop muted>
                <source src={Video} type="video/mp4" />
              </video>
            </div>
          </section>
        </div>
      </main>
      <div className="visit-us-button" onClick={handleVisitClick}>
        <img src={"https://cdn.iconscout.com/icon/free/png-512/free-robot-97-415007.png?f=webp&w=256"} alt="Robot Icon" className="robot-icon" />
        Visit Us
      </div>

      {hideVisit && (
        <div ref={formRef} className="container">
          <div className="main-content">
            <div style={{ width: "30%" }}>
              <img width={"100%"} src="https://www.gangaaram-tech.com/wp-content/uploads/2023/07/cropped-GT_Logo.png" alt="Gangaaram Technologies Logo" />
              <h2>Mango Farm Visit Booking</h2>
              <p>🕒 3 hr</p>
              <p>📍 Mango Farms</p>
              <p style={{ width: "98%" }}>Welcome to our Mango Farms and Goshala, a serene escape where nature and tranquility meet. Book your visit to explore lush mango orchards, taste the freshest fruits, and experience traditional Indian farming. Our Goshala offers an unforgettable experience for all ages.</p>
            </div>

            {!showForm && (
              <>
                <div style={{ backgroundColor: "black", height: "580px" }}>
                  &nbsp;
                </div>
                <div className="calendar-section">
                  <h3>Select a Date & Time</h3>
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    dateClick={handleDateClick}
                    eventClassNames={eventClassNames}
                    selectMirror={true}
                    validRange={{
                      start: new Date(), // Start date is today
                      end: new Date('2025-12-31'), // Adjust the end date as needed
                    }}
                  />
                  <div className="time-zone">
                    <p>Time zone</p>
                    <p>India Standard Time (4:00pm)</p>
                  </div>
                </div>

                <div className="time-slots">
                  {selectedDate && (
                    <div className="selected-date">
                      <h4>Selected Date: {formatDate(visiter_day)}</h4>
                      {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '03:00 PM', '04:00 PM', '04:30 PM'].map((time) => (
                        <button
                          key={time}
                          className={`time-slot ${selectedTimeSlot === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSlotClick(time)}
                          disabled={!isFutureTimeSlot(time)}
                        >
                          {time}<br /><small>25 spots left</small>
                        </button>
                      ))}
                    </div>
                  )}
                  {selectedTimeSlot && (
                    <button className="next" onClick={handleNextClick}>
                      Next
                    </button>
                  )}
                </div>
              </>
            )}

            {showForm && (
              <>
                <div style={{ backgroundColor: "black", height: "1100px" }}>
                  &nbsp;
                </div>
                <div className="form-section">
                  <h3>Enter Details</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={visiter_name}
                        onChange={(e) => setVisiter_name(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={visiter_email}
                        onChange={(e) => setVisiter_email(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Please share anything that will help prepare for our meeting.</label>
                      <textarea
                        className="form-control"
                        value={vister_reason}
                        onChange={(e) => setVisiter_reason(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Contact Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        required
                        value={visiter_number}
                        onChange={(e) => setVisiter_number(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address *</label>
                      <textarea
                        className="form-control"
                        required
                        value={vister_address}
                        onChange={(e) => setVisiter_address(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Gender *</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            required
                            checked={visiter_gender === 'male'}
                            onChange={(e) => setVisiter_gender(e.target.value)}
                          /> Male
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            required
                            checked={visiter_gender === 'female'}
                            onChange={(e) => setVisiter_gender(e.target.value)}
                          /> Female
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>District *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={visiter_district}
                        onChange={(e) => setVisiter_district(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <select
                        className="form-control"
                        required
                        value={visiter_state}
                        onChange={(e) => setVisiter_state(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        {/* Add options here */}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Mode Of Transport *</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="transport"
                            value="car"
                            required
                            checked={visiter_transport === 'car'}
                            onChange={(e) => setVisiter_transport(e.target.value)}
                          /> Car
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="transport"
                            value="bike"
                            required
                            checked={visiter_transport === 'bike'}
                            onChange={(e) => setVisiter_transport(e.target.value)}
                          /> Bike
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="transport"
                            value="public"
                            required
                            checked={visiter_transport === 'public'}
                            onChange={(e) => setVisiter_transport(e.target.value)}
                          /> Public Transport
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="transport"
                            value="other"
                            required
                            checked={visiter_transport === 'other'}
                            onChange={(e) => setVisiter_transport(e.target.value)}
                          /> Other
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Send text messages to</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={visiter_message}
                        onChange={(e) => setVisiter_message(e.target.value)}
                      />
                    </div>
                    <input type="submit" className="btn btn-primary" />
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
