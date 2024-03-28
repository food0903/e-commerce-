import React, { useState, useEffect } from 'react';
import ProductItemRemove from '../component/ProductItemRemove'; // Assuming correct path to ProductItemRemove component

function CartPage() {
  // State to store the products in the cart
  const [cartProducts, setCartProducts] = useState([]);

  // Function to update cartProducts state from localStorage
  const updateCartFromLocalStorage = () => {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartProducts(cartItemsFromLocalStorage);
  };

  useEffect(() => {
    updateCartFromLocalStorage();

    // Add event listener to listen for changes in localStorage
    window.addEventListener('storage', updateCartFromLocalStorage);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', updateCartFromLocalStorage);
    };
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartProducts.map((product, index) => (
          <ProductItemRemove key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CartPage;
