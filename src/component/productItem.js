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
    // Add logic here to handle adding the product to the cart
    console.log('Product added to cart:', product.title);
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
          <Button variant="primary" className="btn btn-primary btn-sm p-2"  onClick={handleAddToCart}>Add to Cart</Button>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductItem;
