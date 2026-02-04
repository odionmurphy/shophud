import React from "react";
import "./ReturnsPage.css";

export const ReturnsPage: React.FC = () => {
  return (
    <div className="returns-container">
      <h1 className="returns-title">Easy Returns & Exchanges</h1>
      <p className="returns-subtitle">
        Customer satisfaction is our priority. We make returns and exchanges
        simple and hassle-free.
      </p>

      <div className="returns-content">
        <div className="returns-main">
          <section className="returns-section">
            <h2 className="returns-section-title">Return Policy</h2>
            <div className="returns-section-content">
              <p>
                We want you to be completely satisfied with your purchase. If
                you're not happy with an item, here's what you need to know:
              </p>
              <ul className="returns-list">
                <li className="returns-list-item">
                  30-day return window from purchase date
                </li>
                <li className="returns-list-item">
                  Items must be unused and in original packaging
                </li>
                <li className="returns-list-item">
                  Free return shipping on orders over $50
                </li>
                <li className="returns-list-item">
                  Full refund or store credit within 5-7 business days
                </li>
                <li className="returns-list-item">
                  Final sale items are non-returnable
                </li>
              </ul>
            </div>
          </section>

          <section className="returns-section">
            <h2 className="returns-section-title">How to Return Items</h2>
            <div className="returns-section-content">
              <ol className="returns-process-steps">
                <li className="returns-process-step">
                  <strong>Log into your account</strong> and go to "My Orders"
                  to request a return
                </li>
                <li className="returns-process-step">
                  <strong>Select the item</strong> you want to return and choose
                  your reason
                </li>
                <li className="returns-process-step">
                  <strong>Print the return label</strong> that we provide or
                  request one by email
                </li>
                <li className="returns-process-step">
                  <strong>Pack your item</strong> securely in its original
                  packaging
                </li>
                <li className="returns-process-step">
                  <strong>Drop off</strong> at any authorized carrier location
                  using the provided label
                </li>
                <li className="returns-process-step">
                  <strong>Track your return</strong> online and receive
                  confirmation when it arrives
                </li>
              </ol>
            </div>
          </section>

          <section className="returns-section">
            <h2 className="returns-section-title">Exchange Program</h2>
            <div className="returns-section-content">
              <p>
                Need a different size or color? Exchanges are quick and easy!
              </p>
              <ul className="returns-list">
                <li className="returns-list-item">
                  Exchanges for same item available within 60 days
                </li>
                <li className="returns-list-item">
                  Free exchange shipping both ways
                </li>
                <li className="returns-list-item">
                  No restocking fees for exchanges
                </li>
                <li className="returns-list-item">
                  Item must be unused and in original condition
                </li>
              </ul>
            </div>
          </section>

          <section className="returns-section">
            <h2 className="returns-section-title">Return Conditions</h2>
            <table className="returns-table">
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Refund Amount</th>
                  <th>Shipping Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Unused, original packaging</td>
                  <td>Full refund</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td>Used, minor wear</td>
                  <td>80-90% refund</td>
                  <td>Customer pays</td>
                </tr>
                <tr>
                  <td>Damaged by customer</td>
                  <td>50% refund</td>
                  <td>Customer pays</td>
                </tr>
                <tr>
                  <td>Defective/damaged in shipping</td>
                  <td>Full refund</td>
                  <td>Free</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="returns-section">
            <h2 className="returns-section-title">Items Not Returnable</h2>
            <div className="returns-section-content">
              <p>The following items cannot be returned:</p>
              <ul className="returns-list">
                <li className="returns-list-item">
                  Final Sale items (marked at checkout)
                </li>
                <li className="returns-list-item">
                  Clearance or liquidation items
                </li>
                <li className="returns-list-item">
                  Custom or personalized items
                </li>
                <li className="returns-list-item">Perishable items</li>
                <li className="returns-list-item">
                  Gift cards and digital items
                </li>
              </ul>
            </div>
          </section>

          <section className="returns-section">
            <h2 className="returns-section-title">Defective Items</h2>
            <div className="returns-section-content">
              <p>Received a defective item? We'll make it right immediately.</p>
              <ul className="returns-list">
                <li className="returns-list-item">
                  Report defects within 14 days of delivery
                </li>
                <li className="returns-list-item">
                  Provide photos of the defect
                </li>
                <li className="returns-list-item">
                  Receive replacement or full refund
                </li>
                <li className="returns-list-item">
                  Free return and replacement shipping
                </li>
              </ul>
            </div>
          </section>
        </div>

        <aside className="returns-sidebar">
          <h3 className="returns-sidebar-title">Return Summary</h3>
          <div className="returns-highlight-box">
            <p className="returns-highlight-text">🔄 30-Day Returns</p>
          </div>

          <div className="returns-highlight-box">
            <p className="returns-highlight-text">📦 Free Return Shipping</p>
          </div>

          <div className="returns-highlight-box">
            <p className="returns-highlight-text">💰 Full Refunds</p>
          </div>

          <div className="returns-highlight-box">
            <p className="returns-highlight-text">🔃 Easy Exchanges</p>
          </div>

          <div className="returns-contact-box">
            <p className="returns-contact-title">Questions?</p>
            <p className="returns-contact-text">
              Email us at returns@shophub.com or call 1-800-SHOP-HUB. We're here
              to help Monday-Friday, 9 AM - 5 PM EST.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
