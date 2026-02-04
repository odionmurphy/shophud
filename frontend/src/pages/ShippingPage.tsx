import React from "react";
import "./ShippingPage.css";

export const ShippingPage: React.FC = () => {
  return (
    <div className="shipping-container">
      <h1 className="shipping-title">Free Shipping Information</h1>
      <p className="shipping-subtitle">
        We offer fast and reliable shipping to all customers
      </p>

      <div className="shipping-content">
        <div className="shipping-main">
          <section className="shipping-section">
            <h2 className="shipping-section-title">
              Free Shipping Eligibility
            </h2>
            <div className="shipping-section-content">
              <p>Enjoy free shipping on orders over $50!</p>
              <ul className="shipping-list">
                <li className="shipping-list-item">
                  Free shipping on all orders $50 and above
                </li>
                <li className="shipping-list-item">
                  Applies to standard continental US delivery
                </li>
                <li className="shipping-list-item">
                  No minimum order requirements for eligible orders
                </li>
                <li className="shipping-list-item">
                  Automatically applied at checkout
                </li>
              </ul>
            </div>
          </section>

          <section className="shipping-section">
            <h2 className="shipping-section-title">Shipping Rates</h2>
            <table className="shipping-table">
              <thead>
                <tr>
                  <th>Order Amount</th>
                  <th>Shipping Cost</th>
                  <th>Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$50+</td>
                  <td>Free</td>
                  <td>5-7 business days</td>
                </tr>
                <tr>
                  <td>$25-$49.99</td>
                  <td>$4.99</td>
                  <td>5-7 business days</td>
                </tr>
                <tr>
                  <td>$10-$24.99</td>
                  <td>$3.99</td>
                  <td>5-7 business days</td>
                </tr>
                <tr>
                  <td>Under $10</td>
                  <td>$2.99</td>
                  <td>5-7 business days</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="shipping-section">
            <h2 className="shipping-section-title">Expedited Shipping</h2>
            <div className="shipping-section-content">
              <p>Need your order faster? We offer expedited options:</p>
              <ul className="shipping-list">
                <li className="shipping-list-item">
                  <strong>2-Day Shipping:</strong> $9.99 (orders $50+: $5.99)
                </li>
                <li className="shipping-list-item">
                  <strong>Overnight Shipping:</strong> $19.99 (orders $50+:
                  $14.99)
                </li>
                <li className="shipping-list-item">
                  Available on most items in stock
                </li>
                <li className="shipping-list-item">
                  Select at checkout to confirm availability
                </li>
              </ul>
            </div>
          </section>

          <section className="shipping-section">
            <h2 className="shipping-section-title">Shipping & Tracking</h2>
            <div className="shipping-section-content">
              <ul className="shipping-list">
                <li className="shipping-list-item">
                  Track your order in real-time via email notification
                </li>
                <li className="shipping-list-item">
                  Tracking number provided within 24 hours of shipment
                </li>
                <li className="shipping-list-item">
                  Insured shipments protect your purchase
                </li>
                <li className="shipping-list-item">
                  We ship Monday-Friday (excluding holidays)
                </li>
              </ul>
            </div>
          </section>

          <section className="shipping-section">
            <h2 className="shipping-section-title">International Shipping</h2>
            <div className="shipping-section-content">
              <p>
                We currently offer limited international shipping. Contact us
                for more information on international delivery options.
              </p>
              <ul className="shipping-list">
                <li className="shipping-list-item">
                  Select countries available
                </li>
                <li className="shipping-list-item">
                  Additional customs and import taxes may apply
                </li>
                <li className="shipping-list-item">
                  Delivery time varies by destination
                </li>
              </ul>
            </div>
          </section>
        </div>

        <aside className="shipping-sidebar">
          <h3 className="shipping-sidebar-title">Quick Info</h3>
          <div className="shipping-highlight-box">
            <p className="shipping-highlight-text">
              🎁 Free Shipping on Orders $50+
            </p>
          </div>

          <div className="shipping-highlight-box">
            <p className="shipping-highlight-text">
              📦 Standard Delivery: 5-7 Days
            </p>
          </div>

          <div className="shipping-highlight-box">
            <p className="shipping-highlight-text">
              ⚡ Express Options Available
            </p>
          </div>

          <div className="shipping-contact-box">
            <p className="shipping-contact-title">Need Help?</p>
            <p className="shipping-contact-text">
              Contact us at support@shophub.com or call 1-800-SHOP-HUB for any
              shipping inquiries.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
