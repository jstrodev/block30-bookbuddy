import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './components/Account/AccountPage';
import Login from './components/Login';
import SingleBook from './components/SingleBook';
import HomePage from './pages/HomePage';
import Register from './components/Register';
import Signup from './components/Signup';
import AuthPage from './components/Authentication/AuthPage';
// import { useState } from 'react';
// import bookLogo from './assets/books.png';

function App() {
  // const [token, setToken] = useState(null);

  return (
    <>
      <Router>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SingleBook/:id" element={<SingleBook />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AuthPage" element={<AuthPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
