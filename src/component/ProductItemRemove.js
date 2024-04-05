import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

function ProductItemRemove({ product }) {
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoadedProduct(product);
  }, [product]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      handleRemoveFromCart();
    } else {
      setQuantity(quantity - 1);
    }
  };
  

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
    fetch(`https://dummyjson.com/products/${loadedProduct.id}`)
      .then(res => res.json())
      .then(product => {
        const customName = window.prompt('Enter custom name:');
        if (customName !== null && customName.trim() !== '') {
          const updatedTitle = `${customName}'s ${product.title}`;
          setLoadedProduct({ ...product, title: updatedTitle });
        }
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };
  

  return (
    <div>
      {loadedProduct ? (
        <Card className="text-center p-4">
          <Button variant="outline-secondary" className="position-absolute top-0 start-0 m-2" onClick={handleEditProduct}>
            Edit
          </Button>
          <div className="position-absolute top-0 end-0 m-2">
        <Button variant="outline-secondary" size="sm" className="me-2" onClick={decreaseQuantity}>-</Button>
        <span className="me-2">{quantity}</span>
        <Button variant="outline-secondary" size="sm" onClick={increaseQuantity}>+</Button>
      </div>
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
