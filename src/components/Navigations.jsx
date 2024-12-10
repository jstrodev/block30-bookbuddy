/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Navigations = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact">Contact</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navbar-item">
              <Link to="/account">Account</Link>
            </li>
            <li className="navbar-item">
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigations;