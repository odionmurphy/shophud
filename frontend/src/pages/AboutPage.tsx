import React from "react";
import { Link } from "react-router-dom";
import { FiAward, FiUsers, FiTruck, FiHeart } from "react-icons/fi";
import "./AboutPage.css";

export const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          About ShopHub
        </h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Your trusted online marketplace for quality products and exceptional
          customer service
        </p>
      </section>

      {/* Our Story */}
      <section className="about-story-section">
        <h2>Our Story</h2>
        <div className="about-story-content">
          <p>
            ShopHub was founded with a simple mission: to provide customers with
            access to high-quality products at competitive prices, all from the
            comfort of their homes. What started as a small online store has
            grown into a trusted marketplace serving thousands of customers
            worldwide.
          </p>
          <p>
            We believe in transparency, reliability, and putting our customers
            first. Every product on our platform is carefully curated to ensure
            quality, and our team works tirelessly to provide exceptional
            service.
          </p>
          <p>
            Today, ShopHub is proud to offer a wide range of products across
            multiple categories, all with our commitment to excellence and
            customer satisfaction.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="about-values-section">
        <h2>Our Values</h2>
        <div className="about-values-grid">
          <div className="about-value-card quality">
            <FiAward className="about-value-icon" />
            <h3>Quality</h3>
            <p className="text-gray-600">
              We are committed to offering only the best quality products that
              meet our high standards
            </p>
          </div>
          <div className="about-value-card customer">
            <FiUsers className="about-value-icon" />
            <h3>Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We're here to help and support
              you every step of the way
            </p>
          </div>
          <div className="about-value-card reliability">
            <FiTruck className="about-value-icon" />
            <h3>Reliability</h3>
            <p className="text-gray-600">
              Fast shipping, secure payments, and reliable service are
              guaranteed on every order
            </p>
          </div>
          <div className="about-value-card trust">
            <FiHeart className="about-value-icon" />
            <h3>Trust</h3>
            <p className="text-gray-600">
              We build trust through transparency, honesty, and consistent
              delivery of our promises
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section">
        <h2>By The Numbers</h2>
        <div className="about-stats-grid">
          <div className="about-stat-item">
            <div className="about-stat-number">50K+</div>
            <p className="about-stat-label">Happy Customers</p>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">10K+</div>
            <p className="about-stat-label">Products Available</p>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">100%</div>
            <p className="about-stat-label">Satisfaction Rate</p>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">24/7</div>
            <p className="about-stat-label">Customer Support</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-why-section">
        <h2>Why Choose Us?</h2>
        <div className="about-why-grid">
          <div className="about-why-card">
            <div className="about-why-emoji">🚚</div>
            <h3>Free Shipping</h3>
            <p className="text-gray-600">
              On all orders over $50. Fast and reliable delivery
            </p>
          </div>
          <div className="about-why-card">
            <div className="about-why-emoji">🔒</div>
            <h3>Secure Checkout</h3>
            <p className="text-gray-600">
              Your payment information is always protected
            </p>
          </div>
          <div className="about-why-card">
            <div className="about-why-emoji">💯</div>
            <h3>Money Back Guarantee</h3>
            <p className="text-gray-600">
              30-day returns and full refunds if not satisfied
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <h2>Ready to Shop?</h2>
        <p>Explore our amazing collection and find everything you need</p>
        <Link to="/products" className="about-cta-button">
          Start Shopping
        </Link>
      </section>

      {/* Contact */}
      <section className="about-contact-section">
        <h2>Have Questions?</h2>
        <p>We're here to help! Reach out to our support team anytime.</p>
        <div className="about-contact-info">
          <p>📧 Email: support@shophub.com</p>
          <p>📞 Phone: 1-800-SHOP-HUB</p>
          <p>💬 Live Chat: Available 24/7</p>
        </div>
      </section>
    </div>
  );
};
