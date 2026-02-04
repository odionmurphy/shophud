import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/api";
import { useCartStore } from "../store";
import "./CheckoutPage.css";

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;

      await orderService.create({
        shippingAddress,
        paymentMethod: "credit_card",
      });

      clearCart();
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="checkout-empty">
        <h1 className="checkout-empty-title">Checkout</h1>
        <p className="checkout-empty-text">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="form-section">
            <h2 className="form-section-title">Shipping Information</h2>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="form-input"
            />
            <div className="form-row-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </section>

          <section className="form-section">
            <h2 className="form-section-title">Payment Information</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="form-input"
            />
            <div className="form-row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </section>

          <button type="submit" disabled={loading} className="checkout-button">
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div
            className="orders-list"
            style={{ maxHeight: "384px", overflowY: "auto" }}
          >
            {cart.items.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.product?.name} x {item.quantity}
                </span>
                <span>
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-item">
            <span>Subtotal</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-item">
            <span>Tax</span>
            <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
