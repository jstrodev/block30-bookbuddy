/**
 * LoginForm.jsx
 * 
 * Purpose:
 * Provides a form for users to log in with their username and password.
 * Includes input validation and submission logic to authenticate the user.
 */

import React, { useState } from 'react';
import './AuthStyles.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!formData.username || !formData.password) {
            setError('Both fields are required.');
            return;
        }

        // Mock login submission
        console.log('Logging in with:', formData);

        // Example: Redirect or update global state upon successful login
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
            <button type="submit" className="form-button">Login</button>
        </form>
    );
};

export default LoginForm;