import { useGetBooksQuery } from "./booksSlice"
import { Link } from 'react-router-dom';

const Books = () => {
  const { data: books, isLoading, isSuccess } = useGetBooksQuery();
  
  console.log(books, isLoading, isSuccess)
  const bookList = books?.books;
  console.log("books:" ,books);

  return (
    <>
      <div>
        <div>
          <div>
            <div className="mainTitle">
              <div><h1>Welcome to visit our e-Book Store</h1></div>
              <div className = "signinLogin">
                <Link to="/Signup"><button type="button" className="btn btn-outline-primary">Sign Up</button></Link>&nbsp;&nbsp;
                <Link to="/Login"><button type="button" className="btn btn-outline-success">Log In</button></Link>
              </div>
            </div>
            <div className="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <div className="search-container">
              {/* <form action="/action_page.php"> */}
                <input type="text" placeholder="Search.." name="search"/>
              {/* </form> */}
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
              {isLoading && <tr><td colSpan="6">Loading Books...</td></tr>}
              {bookList ? (
                bookList.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">{p.id}</th>
                    <td><h5>{p.title}</h5></td>
                    <td> <img className = "bookCoverSize" src={p.coverimage} alt={p.name} /></td>
                    <td><h6>{p.author}</h6></td>
                    <td>{p.description}</td>
                    <td>{p.available === "false" ? "NO": "Yes"}</td>
                  </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6">Loading Books...</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Books;
