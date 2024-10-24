import React from 'react';

const ProductCard = () => {
  return (
    <div className="product-card">
      <img src="statik/images/product.jpg" alt="Product" />
      <h2>Product Title</h2>
      <p>$Price</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
