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
          console.log('Product removed from cart:', loadedProduct.title);

          // Remove the corresponding item from localStorage
          const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const updatedCartItems = existingCartItems.filter(item => item.id !== loadedProduct.id);
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

          setLoadedProduct(null);
        } else {
          console.error('Error removing product from cart:', data);
        }
      })
  };

  return (
    <div>
      {loadedProduct ? (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Title>{loadedProduct.title}</Card.Title>
            <Card.Text>{loadedProduct.description}</Card.Text>
            <Card.Text>Price: ${loadedProduct.price}</Card.Text>
            <img src={loadedProduct.thumbnail} alt={loadedProduct.title} />
            <Button variant="danger" className="btn btn-danger btn-sm p-2 mt-3" onClick={handleRemoveFromCart}>
              Remove from Cart
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default ProductItemRemove;
