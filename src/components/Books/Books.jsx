/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React from 'react';
import { useGetBooksQuery } from "./bookSlice"

const Books = () => {
  const { data: books, isLoading, isSuccess } = useGetBooksQuery();
  
  console.log(books, isLoading, isSuccess)
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Books;
