// src/components/about/AboutDialog.jsx
import React from "react";
import "./About.css";

const AboutDialog = ({ brandName, onClose }) => {
  return (
    <div className="about-dialog">
      <div className="about-dialog__content">
        <h2>About {brandName}</h2>
        <p>
          {brandName} is a modern eCommerce platform designed to provide a
          seamless shopping experience. We offer a wide range of products and
          prioritize secure, hassle-free transactions for our customers.
        </p>
        <button className="about-dialog__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutDialog;
