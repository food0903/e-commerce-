import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

function ProductItemRemove({ product }) {
  const [loadedProduct, setLoadedProduct] = useState(null);

  useEffect(() => {
    setLoadedProduct(product);
  }, [product]);

  const handleRemoveFromCart = () => {
    fetch(`https://dummyjson.com/products/${loadedProduct.id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.isDeleted) {
          const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const updatedCartItems = existingCartItems.filter(item => item.id !== loadedProduct.id);
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

          setLoadedProduct(null);
        } 
      });
  };

  const handleEditProduct = () => {
    const customName = window.prompt('Enter custom name:');
    if (customName !== null && customName.trim() !== '') { // Check if input is not empty
      fetch(`https://dummyjson.com/products/${loadedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customName
        })
      })
        .then(res => res.json())
        .then(updatedProduct => {
          setLoadedProduct(updatedProduct);
          // Update local storage
          const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const updatedCartItems = existingCartItems.map(item =>
            item.id === loadedProduct.id ? { ...item, title:customName } : item
          );
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    }
  };

  return (
    <div>
      {loadedProduct ? (
        <Card className="text-center p-4">
          <Button variant="outline-secondary" className="position-absolute top-0 start-0 m-2" onClick={handleEditProduct}>
            Edit
          </Button>
          <Card.Body>
            <Card.Title>{loadedProduct.title}</Card.Title>
            <Card.Text>{loadedProduct.description}</Card.Text>
            <Card.Text>Price: ${loadedProduct.price}</Card.Text>
            <img src={loadedProduct.thumbnail} alt={loadedProduct.title} />
            <div className="d-grid gap-2">
              <Button variant="danger" className="btn btn-danger btn-sm mt-3" onClick={handleRemoveFromCart}>
                Remove from Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default ProductItemRemove;
