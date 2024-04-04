import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './component/Navbar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import SearchedProduct from './pages/SearchedProduct';

function isTokenExpired() {
  const token = localStorage.getItem('token');
  if (!token) return true; // If token doesn't exist, consider it expired
  const tokenData = JSON.parse(atob(token.split('.')[1])); // Decoding token payload
  return tokenData.exp * 1000 < Date.now(); // Checking if expiration time is less than current time
}

function App() {
  // Load isLoggedIn state from local storage or default to false if not present
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Update local storage whenever isLoggedIn state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Check token expiration on component mount
  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem('token'); // Remove token from local storage
      setIsLoggedIn(false); // Set isLoggedIn to false
    }
  }, []);

  return (
    <Router>
      <div>
        <CustomNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/SearchedProduct/:item" element={<SearchedProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
