import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userddata, setUserEmail } from './userdetails';
import './Header.css';
import verify from './verify';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [userdetail, setUserdetail] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [loginhide, setLoginhide] = useState(true);
  const [userdetails, setUserdetails] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const formRef = useRef(null);
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [usermail, setUsermail] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setLemail(storedEmail);
      setUserEmail(storedEmail);
      setUsername(storedEmail);
      setUsermail(storedEmail);
      setLoginhide(false);
      setUserdetail(true);

      // Fetch user details
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:5000/userdetails', { params: { email: storedEmail } });
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormVisible(false);
        setUserdetails(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsFormVisible(false);
        setUserdetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!isTermsAccepted) {
      alert("You must accept the terms and conditions to sign up.");
      return;
    }

    try {
      const userDetailsResponse = await axios.get('http://localhost:5000/login', { params: { email } });

      // If the userDetailsResponse is successful, it means the email is already in use
      if (userDetailsResponse.data.email) {
        alert("The email is already in use");
        return;
      }
    } catch (error) {
      // If there is an error, it means the email is not in use, so we can proceed with signup
      // But we need to make sure the error is because the user does not exist and not some other issue
      if (error.response && error.response.status === 404) {
        // Proceed with signup
        try {
          await axios.post('http://localhost:5000/signup', { email, name, number, password });

          alert("Your signup credentials have been submitted");
          setEmail("");
          setPassword("");
          setName("");
          setNumber("");
          setConfirmPassword("");

          setIsFormVisible(false);
        } catch (signupError) {
          alert("The data is not submitted");
        }
      } else {
        alert("An error occurred while checking the email. Please try again.");
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting login with:', { lemail, lpassword });

    try {
      const response = await axios.post('http://localhost:5000/login', { lemail, lpassword });
      console.log('Response:', response);

      if (response.data.success) {
        alert("Login successful");
        verify[0].valid = true;
        setIsFormVisible(false);
        setLoginhide(false);
    
        localStorage.setItem('email',lemail)
        // Fetch user details after successful login
        const userDetailsResponse = await axios.get('http://localhost:5000/userdetails', { params: { email: lemail } });
        setUserDetails(userDetailsResponse.data);

        setUserEmail(lemail);
        setUsername(lemail);
        setUsermail(lemail);
        setUserdetail(true);
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      alert("Invalid login credentials");
    }
  };

  function handleLoginPageButton() {
    setIsLoginVisible(true);
    setIsSignupVisible(false);
    setIsFormVisible(true);
  }

  function handleSignupPageButton() {
    setIsSignupVisible(true);
    setIsLoginVisible(false);
    setIsFormVisible(true);
  }

  function handleHideForm() {
    setIsFormVisible(false);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  const sk = () => {
    setUserdetails(true);
  };

  const logoutk = () => {
    alert("You have been logged out");
    localStorage.removeItem('email');
    setUserdetails(false);
    setLoginhide(true);
    setUserdetail(false);
    setLemail("");
    setLpassword("");
    setUserDetails([]);
    setUsername("");
    setUsermail("");
    verify[0].valid = false;
    navigate("/");
  };

  return (
    <header className="header">
      <h1>Mango Farm</h1>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Products">Products</Link></li>
          <li><Link to="/Goshala">Goshala</Link></li>
          <li style={{ width: "435px" }}><Link to="/Cancel">My Orders</Link></li>
          <li><Link to="/Gallery">Gallery</Link></li>
          <li style={{ width: "365px" }}><Link to="/About">About us</Link></li>
          <li style={{ width: "329px" }}><Link to="/Temple">Near Us</Link></li>
          <li><Link to="/Blog">Blog</Link></li>
          {!localStorage.getItem('email') && (
            <li onClick={handleLoginPageButton}>Login</li>
          )}
          {localStorage.getItem('email') && (
            <li>
              <img
                onClick={sk}
                style={{ width: "60px", position: 'relative', top: "-16px", backgroundColor: "", borderRadius: "20px", textAlign: "center" }}
                src="https://img.icons8.com/?size=50&id=7820&format=png"
                alt="User Icon"
              />
            </li>
          )}
          {userdetails && (
            <div className='rkkk' ref={formRef} style={{ position: "relative", right: "-300px", top: "120px", backgroundColor: "aliceblue", position: "absolute", textAlign: "left", borderRadius: "10px", zIndex: "1" }}>
              <h3>&nbsp;&nbsp;Email: {localStorage.getItem('email')}</h3>
              <h3>&nbsp;&nbsp;Name: {userDetails.name}</h3>
              <h3>&nbsp;&nbsp;number: {userDetails.number}</h3>
              <center>
                <button onClick={logoutk} style={{
                  backgroundColor: 'orange',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  Logout
                </button>
              </center>
              <br></br>
            </div>
          )}
          <div className='main-container'>
            {isFormVisible && (
              <div className='backdrop'>
                <div className='login-signup-form-container' ref={formRef}>
                  <button className='hide-button' onClick={handleHideForm}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div className='buttons-container'>
                    <button
                      className={`login-button ${isLoginVisible ? 'active' : ''}`}
                      onClick={handleLoginPageButton}
                    >LOGIN</button>
                    <button
                      className={`signup-button ${isSignupVisible ? 'active' : ''}`}
                      onClick={handleSignupPageButton}
                    >SIGN UP</button>
                  </div>
                  {isLoginVisible && (
                    <div className='login-page' >
                      <form onSubmit={handleLoginSubmit}>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faUser} />
                          <input
                            type='text'
                            placeholder='Username / Email'
                            value={lemail}
                            required
                            onChange={(e) => setLemail(e.target.value)}
                          />
                        </div>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faLock} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={lpassword}
                            required
                            onChange={(e) => setLpassword(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={togglePasswordVisibility}
                            className='eye-icon'
                          />
                        </div>
                        <div className='remember-forgot-container'>
                          <div>
                            <input type='checkbox' className='remember-me-container' />
                            <label>Remember Me</label>
                          </div>
                          <a className='forget-password-container' href='#'>Forget password?</a>
                        </div>
                        <button className='sign-in-button' type='submit'>Sign in</button>
                      </form>
                    </div>
                  )}
                  {isSignupVisible && (
                    <div className='signup-page'>
                      <form onSubmit={handleSignupSubmit}>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faUser} />
                          <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faEnvelope} />
                          <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faUser} />
                          <input
                            type='number'
                            placeholder='Number'
                            value={number}
                            required
                            onChange={(e) => setNumber(e.target.value)}
                          />
                        </div>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faLock} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={togglePasswordVisibility}
                            className='eye-icon'
                          />
                        </div>
                        <div className='input-container'>
                          <FontAwesomeIcon icon={faLock} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <div className='terms-container' style={{ position: "relative", left: "-130px" }}>
                          <input
                            type='checkbox'
                            checked={isTermsAccepted}
                            onChange={(e) => setIsTermsAccepted(e.target.checked)}
                          />
                          <label>I accept the terms and conditions</label>
                        </div>
                        <button className='sign-up-button' type='submit'>Sign up</button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
