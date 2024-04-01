import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './component/Navbar';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import SearchedProduct from './pages/SearchedProduct';


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
