import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryItem from '../component/CategoryItem';
import ProductItem from '../component/productItem';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategoryItems, setCurrentCategoryItems] = useState([]);

  useEffect(() => {
    // Fetch product categories
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data.map(name => name)))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    // Fetch products for the current category based on the current slide index
    const categoryName = categories[currentSlide];
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setCurrentCategoryItems(data.products.map(product => product.id)); // Extract ids from the fetched products
      })
      .catch(error => console.error(`Error fetching items for ${categoryName} category:`, error));
  }, [categories, currentSlide]);

  const handleAfterChange = (index) => {
    setCurrentSlide(index); // Update the current slide index
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    draggable: true,
    afterChange: handleAfterChange
  };

  return (
    <div>
      <h1>Product Categories</h1>
      <Slider {...settings}>
        {categories.map(category => (
          <CategoryItem key={category} categoryName={category} />
        ))}
      </Slider>
      <div className="container mt-4 d-flex justify-content-center">
        <h2>Products</h2>
        </div>
        <div className="container mt-4 d-flex justify-content-center">
            <ul className="list-unstyled">
             {currentCategoryItems.map((id) => (
        <ProductItem key={id} productId={id} />
        ))}
  </ul>
</div>
    </div>
  );
}

export default HomePage;