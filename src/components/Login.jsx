/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // (nicole) for test purposes (for account page)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // (nicole) submits the data to account page so it displays properly
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email: `${username}@example.com` }; // Add email dynamically for demonstration
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/account"); // Redirect to Account page
  };

  return (
    <div>
      <h1>Login Page</h1>
      {/* (nicole) made the button on Submit functional as well, so it redirects you */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            // (nicole) saves the value
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // (nicole) added value so my code is functional, value will be sent to my page
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
