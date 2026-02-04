import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiTruck,
  FiRotateCw,
  FiPackage,
} from "react-icons/fi";
import { useCartStore } from "../store";
import { ProductDropdown } from "./ProductDropdown";
import "./Header.css";

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { cart } = useCartStore();

  return (
    <header className="header-wrapper">
      <div className="header-container">
        {/* Top Info Bar */}
        <div className="header-top-bar">
          <div className="header-top-bar-content">
            <Link to="/shipping">
              <FiTruck />
              <span>Free Shipping on Orders Over $50</span>
            </Link>
            <Link to="/returns">
              <FiRotateCw />
              <span>Easy Returns & Exchanges</span>
            </Link>
            <Link to="/orders">
              <FiPackage />
              <span>Track Your Order</span>
            </Link>
          </div>
        </div>

        {/* Main Header Section */}
        <div className="header-main">
          <Link to="/" className="header-logo">
            ShopHub
          </Link>

          <div className="header-search-wrapper">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <nav className="header-actions">
            <Link to="/cart" className="action-button">
              <FiShoppingCart className="action-icon" />
              {cart.items.length > 0 && (
                <span className="badge">{cart.items.length}</span>
              )}
            </Link>
            <Link to="/profile" className="action-button">
              <FiUser className="action-icon" />
            </Link>
          </nav>
        </div>

        {/* Bottom Navigation */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <div className="nav-dropdown">
            <Link to="/products" className="nav-link">
              Products
              <span>▼</span>
            </Link>
            {/* Product Dropdown Menu */}
            <ProductDropdown />
          </div>
          <Link to="/deals" className="nav-link">
            Deals
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};
