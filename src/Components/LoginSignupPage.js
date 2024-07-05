import React, { useState } from 'react';
import './LoginSignUpPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginSignupPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isSignupVisible, setIsSignupVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

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

    function handleLoginPage() {
        alert("Login successful");
    }

    function handleSignupPage() {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!isTermsAccepted) {
            alert("You must accept the terms and conditions to sign up.");
            return;
        }
        alert("Registered successfully");
    }

    function handleHideForm() {
        setIsFormVisible(false);
    }

    function handleToggleForm() {
        setIsFormVisible(true);
        setIsLoginVisible(true);
        setIsSignupVisible(false);
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <div className='main-container'>
            <button className='toggle-form-button' onClick={handleToggleForm}>
                {isFormVisible ? "Hide Form" : "Show Form"}
            </button>

            {isFormVisible && (
                <div className='backdrop'>
                    <div className='login-signup-form-container'>
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
                            <div className='login-page'>
                                <div className='input-container'>
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type='text'
                                        placeholder='Username / Email'
                                        required
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <div className='input-container'>
                                    <FontAwesomeIcon icon={faLock} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
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
                                <button className='sign-in-button' onClick={handleLoginPage}>Sign in</button>
                            </div>
                        )}

                        {isSignupVisible && (
                            <div className='signup-page'>
                                <div className='input-container'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <div className='input-container'>
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        required
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <div className='input-container'>
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        required
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </div>
                                <div className='input-container'>
                                    <FontAwesomeIcon icon={faLock} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
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
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={togglePasswordVisibility}
                                        className='eye-icon'
                                    />
                                </div>
                                <div>
                                    <input
                                        type='checkbox'
                                        className='terms-container'
                                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                    />
                                    <label>I accept the Terms of Service and Privacy Policy</label>
                                </div>
                                <button
                                    className='sign-up-button'
                                    onClick={handleSignupPage}
                                    disabled={!isTermsAccepted}
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default LoginSignupPage;
