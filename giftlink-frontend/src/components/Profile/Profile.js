/*jshint esversion: 8 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './Profile.css';

function Profile() {
    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [changed, setChanged] = useState('');
    const { setUserName } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem('auth-token');
        if (!authtoken) {
            navigate('/app/login');
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem('auth-token');
            const email = sessionStorage.getItem('email');

            const response = await fetch(`${urlConfig.backendUrl}/api/auth/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authtoken}`,
                    'Content-Type': 'application/json',
                    'Email': email,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails(data);
                setUpdatedDetails(data);
            } else {
                throw new Error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setUpdatedDetails(userDetails);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const authtoken = sessionStorage.getItem('auth-token');
            const email = sessionStorage.getItem('email');

            const payload = {
                name: updatedDetails.name,
            };

            const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
                // Task 1: Set method
                method: 'PUT',
                
                // Task 2: Set headers
                headers: {
                    'Authorization': `Bearer ${authtoken}`,
                    'Content-Type': 'application/json',
                    'Email': email,
                },
                
                // Task 3: Set body to send user details
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Task 4: Set the new name in the AppContext
                setUserName(updatedDetails.name);

                // Task 5: Set user name in the session
                sessionStorage.setItem('name', updatedDetails.name);

                setUserDetails(updatedDetails);
                setEditMode(false);

                // Display success message to the user
                setChanged('Name Changed Successfully!');
                setTimeout(() => {
                    setChanged('');
                    navigate('/app');
                }, 1000);
            } else {
                // Handle error case
                throw new Error('Failed to update profile');
            }
        } catch (e) {
            console.log('Error updating details: ' + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="profile-card p-4 border rounded">
                        <h2 className="text-center mb-4">Profile</h2>

                        {changed && (
                            <div className="alert alert-success" role="alert">
                                {changed}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={updatedDetails.name || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p className="form-control-plaintext">{userDetails.name}</p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <p className="form-control-plaintext">{userDetails.email}</p>
                        </div>

                        <div className="text-center">
                            {editMode ? (
                                <>
                                    <button className="btn btn-primary me-2" onClick={handleSubmit}>
                                        Save
                                    </button>
                                    <button className="btn btn-secondary" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-primary" onClick={handleEdit}>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;