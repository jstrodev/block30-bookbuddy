import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './AccountStyles.css'; // Import the CSS file

const Account = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData); // Set user data from localStorage
    }
    const books = ["1984 by George Orwell", "Kite Runner by Khaled Hosseini"]; // Replace with actual data fetching logic
    setCheckedOutBooks(books);
  }, []);

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/')}>Home</button>
        {/* ...other nav items... */}
      </nav>
      <div className="account-page">
        <h1>Account Page</h1>
        <div>
          <h2>Welcome, {user.username || user.email}!</h2>
        </div>
        <div>
          <h3>Your Checked-Out Books: </h3>
          {checkedOutBooks.length > 0 ? (
            <ul>
              {checkedOutBooks.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          ) : (
            <p>No books have been checked out.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
