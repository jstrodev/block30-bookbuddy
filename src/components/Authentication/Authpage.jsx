/**
 * AuthPage.jsx
 * 
 * Purpose:
 * This component toggles between login and register forms on the same page. 
 * It serves as the primary authentication entry point for users.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './AuthStyles.css';

const AuthPage = ({ onLogin }) => { // Add onLogin prop here
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.isLogin !== undefined) {
            setIsLogin(location.state.isLogin);
        }
    }, [location.state]);

    return (
        <div>
            <nav>
                <button onClick={() => navigate('/')}>Home</button>
                {/* ...other nav items... */}
            </nav>
            <div className="auth-container">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                {/* Render LoginForm or RegisterForm based on isLogin state */}
                {isLogin ? <Login onLogin={onLogin} /> : <Register />}
                <button 
                    className="toggle-button" 
                    onClick={() => setIsLogin(!isLogin)} // Toggle the state
                >
                    {isLogin ? "Switch to Sign Up" : "Switch to Login"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;