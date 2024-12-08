import React, { useState } from "react";
import "./Header.css";

const Header = ({ brandName, cartCount, openCartModal }) => {
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  const toggleAboutDialog = () => {
    setShowAboutDialog(!showAboutDialog);
  };

  return (
    <header className="header">
      <div className="header__brand">
        <h1>{brandName}</h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="#!" onClick={toggleAboutDialog}>
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="header__cart">
        <a
          href="#!"
          className="cart-icon"
          onClick={openCartModal} // Trigger the modal to open
        >
          🛒 <span className="cart-count">{cartCount}</span>
        </a>
      </div>

      {/* About Dialog */}
      {showAboutDialog && (
        <div className="about-dialog">
          <div className="about-dialog__content">
            <h2>About {brandName}</h2>
            <p>
              {brandName} is a modern eCommerce platform designed to provide a
              seamless shopping experience. Explore our wide range of products
              and enjoy secure, hassle-free transactions.
            </p>
            <p>
              <strong>Address:</strong> 2614 130th St Suite 10, Lubbock, TX
              79423, United States
            </p>
            <p>
              <strong>Phone:</strong> +122344566788
            </p>
            <button className="about-dialog__close" onClick={toggleAboutDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
