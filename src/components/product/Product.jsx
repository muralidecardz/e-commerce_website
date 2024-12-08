import React from "react";
import "./Product.css";

const Product = ({
  product,
  addToCart,
  removeFromCart,
  quantity,
  openModal,
}) => {
  const shortDescription = product.description.slice(0, 20) + "...";

  return (
    <div className="product-card" onClick={() => openModal(product)}>
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image"
      />
      <h2>{product.title}</h2>
      <p className="product-category">{product.category.name}</p>
      <div className="product-description-row">
        <p className="short-description">{shortDescription}</p>
        <button
          className="read-more-text-btn"
          onClick={(e) => {
            e.stopPropagation();
            openModal(product);
          }}
        >
          Read More
        </button>
      </div>
      <p className="product-price">Price: ${product.price}</p>
      <div className="product-controls">
        <button
          className="control-btn"
          onClick={(e) => {
            e.stopPropagation();
            removeFromCart(product.id);
          }}
          disabled={quantity === 0}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="control-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
