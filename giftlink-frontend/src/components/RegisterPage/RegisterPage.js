/*jshint esversion: 8 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Task 3
import { urlConfig } from '../../config'; // Task 1
import { useAppContext } from '../../context/AuthContext'; // Task 2
import './RegisterPage.css';

function RegisterPage() {
    // Create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Task 4: Include a state for error message
    const [showerr, setShowerr] = useState('');

    // Task 5: Create local variables for navigate and setIsLoggedIn
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    // Handle Register function with API call
    const handleRegister = async () => {
        setShowerr(''); // Clear previous errors
        
        try {
            // API call to register endpoint
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                // Task 6: Set POST method
                method: 'POST',
                
                // Task 7: Set headers
                headers: {
                    'content-type': 'application/json',
                },
                
                // Task 8: Set body to send user details
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            // Task 1 (Step 2): Access data in JSON format
            const json = await response.json();

            // Task 2 (Step 2): Set user details in session storage
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                
                // Task 3 (Step 2): Set the state of user to logged in
                setIsLoggedIn(true);
                
                // Task 4 (Step 2): Navigate to MainPage after logging in
                navigate('/app');
            }

            // Task 5 (Step 2): Set error message if registration fails
            if (json.error) {
                setShowerr(json.error);
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
            setShowerr("Registration failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* First Name Input */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        {/* Last Name Input */}
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                            {/* Task 6 (Step 2): Display error message to end user */}
                            {showerr && <div className="text-danger mt-2">{showerr}</div>}
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Register Button */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;