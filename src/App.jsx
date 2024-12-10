import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Account from './components/Account/AccountPage';
import Login from './components/Authentication/Login';
import SingleBook from './components/SingleBook';
import HomePage from './pages/HomePage';
import Register from './components/Authentication/Register';
import Signup from './components/Signup';
import AuthPage from './components/Authentication/AuthPage';
import NotFound from './pages/NotFound'; 
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <Router>
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SingleBook/:id" element={<SingleBook />} />
          <Route path="/Account" element={isAuthenticated ? <Account /> : <Navigate to="/Login" />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AuthPage" element={<AuthPage onLogin={handleLogin} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
