import React from "react";
import Product from "./Product";
import "./ProductList.css";

const ProductList = ({
  products,
  addToCart,
  removeFromCart,
  cartList,
  openModal,
}) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          quantity={
            cartList.find((item) => item.id === product.id)?.quantity || 0
          }
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default ProductList;
