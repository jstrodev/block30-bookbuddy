import { useGetBooksQuery } from './BooksSlice';
import { Link } from 'react-router-dom';

const Books = () => {
  const { data: books, isLoading, isSuccess } = useGetBooksQuery();


  // console.log(books, isLoading, isSuccess);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Sign Up</h2>
      <Link to="/Signup">Click here to sign up</Link>
      <h2>Log In</h2>
      <Link to="/Login">Click here to log in</Link>
      <h2>Account Page </h2>
      <Link to="/Account">This is to check progress (delete later)</Link>
    </div>
  );
};

export default Books;
