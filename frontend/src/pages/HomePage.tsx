import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiAward,
  FiZap,
  FiHeart,
  FiChevronRight,
} from "react-icons/fi";
import { ProductCard } from "../components/ProductCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { productService } from "../services/api";
import { useCartStore } from "../store";
import "./HomePage.css";

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await productService.getAll({ limit: 8 });
        setFeaturedProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: "Electronics", icon: "⚡", color: "#3b82f6" },
    { name: "Fashion", icon: "👕", color: "#ec4899" },
    { name: "Home & Garden", icon: "🌿", color: "#22c55e" },
    { name: "Sports", icon: "⚽", color: "#f97316" },
  ];

  const features = [
    {
      icon: <FiTruck className="feature-icon" />,
      title: "Fast Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <FiShield className="feature-icon" />,
      title: "Secure Payment",
      description: "Safe and secure checkout",
    },
    {
      icon: <FiAward className="feature-icon" />,
      title: "Quality Guaranteed",
      description: "30-day money back guarantee",
    },
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="blob-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">ShopHub</span>
            </h1>
            <p className="hero-desc">
              Discover millions of products at unbeatable prices. Shop now and
              enjoy free shipping on orders over $50!
            </p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
              <FiArrowRight />
            </Link>
          </div>
          <div className="hero-visual">
            <div className="floating-box">
              <FiZap className="floating-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Categories</h2>
              <p className="section-desc">
                Browse our most popular collections
              </p>
            </div>
            <Link to="/products" className="view-all">
              View All <FiChevronRight />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="category-item"
                style={{
                  background: `linear-gradient(135deg, ${category.color}, ${adjustColor(
                    category.color,
                    -20,
                  )})`,
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div className="category-emoji">{category.icon}</div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-label">Explore now</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-desc">Check out our best-selling items</p>
            </div>
            <Link to="/products" className="view-all">
              View All <FiChevronRight />
            </Link>
          </div>

          {loadingProducts ? (
            <LoadingSpinner />
          ) : (
            <div className="featured-products-grid">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() =>
                    addToCart({
                      id: product.id,
                      userId: 0,
                      productId: product.id,
                      quantity: 1,
                      product,
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "10K+", label: "Products" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="stat-num">{stat.number}</h3>
                <p className="stat-text">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title centered">Why Choose Us?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item"
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <div className="icon-wrapper">{feature.icon}</div>
                <h3 className="feature-name">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-container">
          <div className="newsletter-inner">
            <FiHeart className="heart-icon" />
            <h2 className="newsletter-title">Join Our Community</h2>
            <p className="newsletter-desc">
              Subscribe to get exclusive offers and updates on new arrivals!
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-subscribe">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-inner">
            <h2 className="cta-title">Ready to start shopping?</h2>
            <p className="cta-desc">
              Join millions of satisfied customers worldwide
            </p>
            <Link to="/products" className="btn btn-secondary">
              Browse All Products
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

function adjustColor(color: string, percent: number): string {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `rgb(${R}, ${G}, ${B})`;
}
