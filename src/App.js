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
  if (!token) return true; 
  const tokenData = JSON.parse(atob(token.split('.')[1])); 
  return tokenData.exp * 1000 < Date.now(); 
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);


  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false); 
    }
  }, []);

  return (
    <Router>
      <div>
        <CustomNavbar/>
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/SearchedProduct/:item" element={<SearchedProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
