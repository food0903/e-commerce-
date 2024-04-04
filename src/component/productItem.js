import React, { useState, useEffect } from 'react';
import { Button, Card, Toast } from 'react-bootstrap';

function ProductItem({ productId }) {
  const [product, setProduct] = useState(null);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    // Fetch product details
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [productId]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000); 
      return;
    }
    
    // Call API to add the product to the cart
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    })
    .then(res => res.json())
    .then(data => {
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCartItems = [...existingCartItems, { ...product, id: product.id }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    })
  };

  return (
    <div style={{ position: 'relative' }}>
      {product ? (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <img src={product.thumbnail} alt={product.title} />
          </Card.Body>
          <Button variant="primary" className="btn btn-primary btn-sm p-2" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Card>
      ) : (
        <p>Loading...</p>
      )}

      <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} delay={3000} autohide className="position-fixed top-0 end-0 mt-3 me-3">
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>You need to login first to add items to the cart</Toast.Body>
      </Toast>
    </div>
  );
}

export default ProductItem;
