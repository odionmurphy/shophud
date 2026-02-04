import React from "react";
import "./Footer.css";

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">About ShopHub</h3>
            <p className="footer-description">
              Your trusted online shopping destination for quality products at
              great prices.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#faq">FAQs</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-links">
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns</a>
              </li>
              <li>
                <a href="#track">Track Order</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <p className="footer-contact">
              Email: support@shophub.com
              <br />
              Phone: 1-800-SHOP-HUB
              <br />
              Address: 123 Commerce St
            </p>
          </div>
        </div>
        <div className="footer-divider">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
