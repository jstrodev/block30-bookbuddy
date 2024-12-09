import React, { useState, useEffect } from "react";

const Account = () => {
  // "var" for user info (information is retrieved from localStorage)
  const [user, setUser] = useState({ username: "", email: "" });

  // "var" for books (checked out books by the user only)
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    // get user data, in this case the use effect is to simulate there is data, since the login is not done yet then this is a placeholder for now
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData); // Set user data from localStorage
    }
    // right now the available books are not yet to be displayed bc we don't actually have books to be displayed to be picked from, but this should be replaced with an api or local data not hard coded books
    const books = ["1984 by George Orwell", "Kite Runner by Khaled Hosseini"]; // Replace with actual data fetching logic
    setCheckedOutBooks(books);
  }, []);

  return (
    // title of the page to identify by id
    <div>
      <h1>Account Page</h1>
      {/* displays the required user info (username or email inputted) */}
      <div>
        <h2>Welcome, {user.username || user.email}!</h2>
      </div>
      {/* displays checked out books, if no books have been checked out then the message below displays */}
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
  );
};

export default Account;
