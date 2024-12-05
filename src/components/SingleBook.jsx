/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function SingleBook({ reservedBooks, setReservedBooks }) {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  //Grabs the books from the api

  useEffect(() => {
    if (id) {
      async function fetchBook() {
        try {
          const response = await fetch(
            `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
          );
          const result = await response.json();
          setBook(result);
        } catch (error) {
          console.error(error);
        }
      }
      fetchBook();
    }
  }, [id]);

  //Checks if the selected book id matches the id of any reserved book

  const reserveBook = () => {
    if (book) {
      const isAlreadyReserved = reservedBooks.some(
        (reservedBook) => reservedBook.id === book.book.id
      );
      if (!isAlreadyReserved) {
        setReservedBooks([...reservedBooks, book.book]);
      } else {
        alert('This book is already reserved.');
      }
    }
  };

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.book.title} Details</h2>
          <p>
            Cover: <img src={book.book.coverimage} alt="{book.book.title}" />
          </p>
          <p>Title: {book.book.title}</p>
          <p>Author: {book.book.author}</p>
          <p>
            Availability: {book.book.available ? 'Available' : 'Not Available'}
          </p>
          <p>Description: {book.book.description}</p>
          <Link to="/">
            <button>Back to Book List</button>
          </Link>
          <button
            onClick={reserveBook}
            style={{
              opacity: isAlreadyReserved ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
            disabled={isAlreadyReserved}
          >
            Reserve this book
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
