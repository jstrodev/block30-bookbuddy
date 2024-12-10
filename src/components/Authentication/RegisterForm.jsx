/**
 * RegisterForm.jsx
 * 
 * Purpose:
 * Provides a form for users to sign up by entering their username and password.
 * Includes input validation and submission logic to register a new user.
 */

import React, { useState } from 'react';
import './AuthStyles.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Mock registration submission
        console.log('Registering with:', formData);

        // Example: Redirect or update global state upon successful registration
        setError(''); // Clear any previous errors
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                />
            </div>
            <button type="submit" className="form-button">Sign Up</button>
        </form>
    );
};

export default RegisterForm;