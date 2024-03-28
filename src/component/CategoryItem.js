import React from 'react';
import { Card } from 'react-bootstrap';
import ProductItem from './productItem';

function CategoryItem({ categoryName }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{categoryName}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CategoryItem;
