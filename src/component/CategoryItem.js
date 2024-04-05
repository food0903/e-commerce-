import React from 'react';
import { Card } from 'react-bootstrap';

function CategoryItem({ categoryName }) {
  return (
    <Card className="mb-3 text-center p-4">
      <Card.Body>
        <Card.Title><strong>{categoryName}</strong></Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CategoryItem;
