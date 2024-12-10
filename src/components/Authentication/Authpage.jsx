/**
 * AuthPage.jsx
 * 
 * Purpose:
 * This component toggles between login and register forms on the same page. 
 * It serves as the primary authentication entry point for users.
 */

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthStyles.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            {/* Render LoginForm or RegisterForm based on isLogin state */}
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <button 
                className="toggle-button" 
                onClick={() => setIsLogin(!isLogin)} // Toggle the state
            >
                {isLogin ? "Switch to Sign Up" : "Switch to Login"}
            </button>
        </div>
    );
};

export default AuthPage;