import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books'); // Ensure the endpoint is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const booksData = await response.json();
        console.log('Fetched books:', booksData); // Log the fetched data
        setBooks(booksData.books); // Access the books array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div>
      <div>
        <div>
          <div className="mainTitle">
            <div><h1>Welcome to visit our e-Book Store</h1></div>
            <div className="signinLogin">
              <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/AuthPage', { state: { isLogin: false } })}>Sign Up</button>&nbsp;&nbsp;
              <button type="button" className="btn btn-outline-success" onClick={() => navigate('/AuthPage', { state: { isLogin: true } })}>Log In</button>
            </div>
          </div>
          <div className="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <div className="search-container">
              <input type="text" placeholder="Search.." name="search"/>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"># ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">Cover Image</th>
              <th scope="col">AUTHOR</th>
              <th className="description" scope="col">Description</th>
              <th scope="col">Available</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {books.length === 0 && <tr><td colSpan="6">No books available.</td></tr>}
            {books.length > 0 && books.map((book) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td><h5>{book.title}</h5></td>
                <td><img className="bookCoverSize" src={book.coverimage} alt={book.title} /></td>
                <td><h6>{book.author}</h6></td>
                <td>{book.description}</td>
                <td>{book.available ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;