import { useState, useEffect } from "react";
import Header from "./components/header/Header.jsx";
import ProductList from "./components/product/ProductList.jsx";
import Skeleton from "react-loading-skeleton";
import "./App.css";
import CheckoutForm from "./components/checkoutForm/CheckoutForm.jsx";
import About from "./components/about/About.jsx";

function App() {
  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=2&limit=44"
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cartList.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartList(
        cartList.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartList([...cartList, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingProduct = cartList.find((item) => item.id === productId);
    if (existingProduct.quantity > 1) {
      setCartList(
        cartList.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCartList(cartList.filter((item) => item.id !== productId));
    }
  };

  const total = cartList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  function closeCheckout() {
    setIsCheckoutOpen(false);
    setIsCartModalOpen(false);
  }

  return (
    <div className="app">
      <Header
        brandName="Big Deals"
        cartCount={cartList.reduce((sum, item) => sum + item.quantity, 0)}
        openCartModal={openCartModal}
      />

      <div className="product-list">
        {loading ? (
          Array(5)
            .fill()
            .map((_, index) => (
              <div key={index} className="product-card-skeleton">
                <Skeleton height={200} />
                <Skeleton width={150} />
                <Skeleton width={100} />
              </div>
            ))
        ) : (
          <ProductList
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartList={cartList}
            openModal={openModal}
          />
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProduct.title}</h2>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <span style={{ color: "#ff5733" }}>
                {selectedProduct.category.name}
              </span>
            </p>
            <div className="modal-images">
              {selectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedProduct.title} ${index + 1}`}
                />
              ))}
            </div>
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}

      {isCartModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Your Cart</h2>
              <button className="modal-close" onClick={closeCartModal}>
                X
              </button>
            </div>
            <div className="modal-items">
              {cartList.map((item) => (
                <div className="modal-item" key={item.id}>
                  <img src={item.images[0]} alt={item.title} />
                  <div className="modal-item-details">
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="modal-item-actions">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <h3>Total: ${total}</h3>
              <button onClick={closeCartModal}>Close</button>
              <button onClick={() => setIsCheckoutOpen(true)}>Checkout</button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && <CheckoutForm onClose={closeCheckout} />}

      {total > 0 && (
        <div className="cart-total">
          <h3>Total: ${total}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
