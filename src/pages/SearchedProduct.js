import React from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from '../component/productItem';

function SearchedProduct() {
    const { item } = useParams();

    return (
        <div>
            <ProductItem productId={item} />
        </div>
    );
}

export default SearchedProduct;
