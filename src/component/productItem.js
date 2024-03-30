import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

function ProductItem({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  const handleAddToCart = () => {
  
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
    <div>
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
    </div>
  );
}

export default ProductItem;
