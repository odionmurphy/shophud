import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productService } from "../services/api";
import { useCartStore } from "../store";
import { FiShoppingCart } from "react-icons/fi";
import "./ProductDropdown.css";

export const ProductDropdown: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [categories, setCategories] = useState<string[]>([]);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll();
        console.log("Products response:", response);
        const productsData = response.data?.data || response.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(productsData.map((p: any) => p.category)),
        ];
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category and price
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, products]);

  return (
    <div className="product-dropdown-wrapper">
      <div className="product-dropdown-container">
        {/* Filters Sidebar */}
        <div className="dropdown-filters">
          <h3 className="filters-title">Filters</h3>

          <div className="filter-section">
            <h4 className="filter-label">Category</h4>
            <div className="filter-options">
              <Link
                to="/products"
                className="filter-option-link"
                onClick={() => {
                  setSelectedCategory("");
                  setPriceRange([0, 1000]);
                }}
              >
                <span>All Categories</span>
              </Link>
              {categories.map((cat) => (
                <label key={cat} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-label">Price Range</h4>
            <div className="price-range-inputs">
              <label className="price-label">
                Min: ${priceRange[0]}
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="price-slider"
                />
              </label>
              <label className="price-label">
                Max: ${priceRange[1]}
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="price-slider"
                />
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategory("");
              setPriceRange([0, 1000]);
            }}
            className="filter-reset-btn"
          >
            Reset Filters
          </button>
        </div>

        {/* Products List */}
        <div className="dropdown-products">
          {loading ? (
            <div className="loading-message">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">No products found</div>
          ) : (
            <>
              <div className="products-count">
                Showing {filteredProducts.length} products
              </div>
              <div className="dropdown-products-grid">
                {filteredProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="dropdown-product-card">
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <div className="product-details">
                      <h4 className="product-name">
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </h4>
                      <p className="product-description">
                        {product.description?.substring(0, 50)}...
                      </p>
                      <div className="product-footer">
                        <span className="product-price">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              userId: 0,
                              productId: product.id,
                              quantity: 1,
                              product,
                            })
                          }
                          className="quick-add-btn"
                          title="Add to cart"
                        >
                          <FiShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/products" className="view-all-link">
                View All Products →
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
