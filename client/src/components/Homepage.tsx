import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const openSignupModal = () => {
        setShowSignupModal(true);
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
    }


    const closeSignupModal = () => {
        setShowSignupModal(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleSignUp = async() => {
        const name = (document.getElementById('signUpName') as HTMLInputElement).value;
        const username = (document.getElementById('signUpUsername') as HTMLInputElement).value;
        const email = (document.getElementById('signUpEmail') as HTMLInputElement).value;
        const password = (document.getElementById('signUpPassword') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('signUpConfirmPassword') as HTMLInputElement).value;
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Check if all fields are filled and valid
        if (password ==='' || confirmPassword === '' || username === '' || name === '' || email === '') {
            alert('All fields must be filled');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        if (username.length < 4 || username.length > 15) {
            alert('Username must be between 4 and 15 characters');
            return;
        }
        if (name.length < 1 || name.length > 50) {
            alert('Name must be between 1 and 50 characters');
            return;
        }
        if (email.length < 1 || email.length > 50) {
            alert('Email must be between 1 and 50 characters');
            return;
        }
        if (email.indexOf('@') === -1) {
            alert('Email must be valid');
            return;
        }
        const data = { name, username, email, password };
        console.log(data);
        console.log(process.env.REACT_APP_SERVER_URL);
        const signUpResponse = await axios.post(process.env.REACT_APP_SERVER_URL + '/user/signup', data);
        console.log(signUpResponse);
        if (signUpResponse.status === 201) {
            alert('Account created Successfully. You can now log in with your username and password.');
            closeSignupModal();
        }
        else if (signUpResponse.data === "Username already exists") {
            alert('Username already exists. Use different credentials.');
        }
        else {
            alert('Error creating account. Please try again.');
        }
    }

    const handleLogin = async() => {
        const username = (document.getElementById('loginUsername') as HTMLInputElement).value;
        const password = (document.getElementById('loginPassword') as HTMLInputElement).value;
        // Check if all fields are filled and valid
        if (password ==='' || username === '') {
            alert('All fields must be filled');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        if (username.length < 4 || username.length > 15) {
            alert('Username must be between 4 and 15 characters');
            return;
        }
        const data = { username, password };
        console.log(data);
        const loginResponse = await axios.post(process.env.REACT_APP_SERVER_URL + '/user/login', data);
        console.log(loginResponse);
        if(loginResponse.data.message === "Login successful") {
            closeLoginModal();
            localStorage.setItem('token', loginResponse.data.token);
            navigate('/user/' + username);
        }
        else {
            closeLoginModal();
            alert('Login unsuccessful. Please try again.');
        }
    }

    return (
        <div className='home'>
            <div className='homePageLogo'>
                {/* Got this svg from "https://twitter.com/" */}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-1nao33i r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>
            <div className='homePageContent'>
                <h1 className='homePageTitle'>Happening now</h1>
                <h2 className='homePageSub'>Join today.</h2>
                <button className='homePageSignUp' onClick={openSignupModal}>Create Account</button>
                <p className='homePageTerms'>By signing up, you agree to the <Link className='link' to='https://twitter.com/tos'>Terms of Service</Link> and <Link className='link' to='https://twitter.com/privacy'>Privacy Policy</Link>, including <Link className='link' to='https://help.twitter.com/rules-and-policies/twitter-cookies'>Cookie Use</Link>.</p>
                <p className='homePageLoginText'><strong>Already have an account?</strong></p>
                <button className='homePageLogIn' onClick={openLoginModal}>Log in</button>
            </div>
            {showSignupModal && (
                <div className="modal fade show signUp" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ backgroundColor: "black" }}>
                            <div className="modal-header" style={{ backgroundColor: "black", border: "1px solid gray" }}>
                                <h5 className="modal-title">Create your account</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={closeSignupModal}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center" style={{ backgroundColor: "black", border: "1px solid gray" }}>
                                <input className='modalInput bg-black textInput' type='text' id='signUpName' placeholder='Name' /><br />
                                <input className='modalInput bg-black textInput' type='text' id='signUpUsername' placeholder='Username' /><br />
                                <input className='modalInput bg-black textInput' type='text' id='signUpEmail' placeholder='Email' /><br />
                                <input className='modalInput bg-black textInput' type='password' id='signUpPassword' placeholder='Password' /><br />
                                <input className='modalInput bg-black textInput' type='password' id='signUpConfirmPassword' placeholder='Confirm Password' /><br />
                                <button className='modalInput signUpButton' onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showSignupModal && (
                <div className="modal-backdrop fade show"></div>
            )}

            {showLoginModal && (
                <div className="modal fade show signUp" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ backgroundColor: "black" }}>
                            <div className="modal-header" style={{ backgroundColor: "black", border: "1px solid gray" }}>
                                <h5 className="modal-title">Log in to Twitter</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={closeLoginModal}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center" style={{ backgroundColor: "black", border: "1px solid gray" }}>
                                <input className='modalInput bg-black textInput' type='text' id='loginUsername' placeholder='Username' /><br />
                                <input className='modalInput bg-black textInput' type='password' id='loginPassword' placeholder='Password' /><br />
                                <button className='modalInput signUpButton' onClick={handleLogin}>Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showLoginModal && (
                <div className="modal-backdrop fade show"></div>
            )}
        </div>
    )
}

export default Homepage