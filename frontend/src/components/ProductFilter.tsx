import React from "react";
import "./ProductFilter.css";

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: [number, number]) => void;
}

export const ProductFilter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceChange,
}) => {
  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>

      <div className="filter-section">
        <h3 className="filter-label">Category</h3>
        <div className="filter-options">
          <label className="filter-radio-label">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="filter-radio"
            />
            <span>All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className="filter-radio-label">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="filter-radio"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-label">Price Range</h3>
        <div className="price-inputs">
          <div className="price-input-group">
            <label className="price-label">Min: ${priceRange[0]}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceChange([parseInt(e.target.value), priceRange[1]])
              }
              className="price-slider"
            />
          </div>
          <div className="price-input-group">
            <label className="price-label">Max: ${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], parseInt(e.target.value)])
              }
              className="price-slider"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          onCategoryChange("");
          onPriceChange([0, 1000]);
        }}
        className="filter-reset"
      >
        Reset Filters
      </button>
    </div>
  );
};
