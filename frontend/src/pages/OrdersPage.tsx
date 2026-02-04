import React, { useState, useEffect } from "react";
import { orderService } from "../services/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import "./OrdersPage.css";

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getAll();
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <p className="orders-empty">No orders yet</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const getStatusClass = (status: string) => {
              switch (status) {
                case "delivered":
                  return "status-delivered";
                case "shipped":
                  return "status-shipped";
                case "processing":
                  return "status-processing";
                default:
                  return "status-pending";
              }
            };

            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">Order #{order.id}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-total">
                    <p className="order-amount">${order.totalAmount}</p>
                    <span
                      className={`order-status-badge ${getStatusClass(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="order-items-header">
                  <p className="order-items-title">Items</p>
                  <div className="order-items-list">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="order-item">
                        <span>Product #{item.productId}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-totals">
                  <p className="order-total-item">
                    <strong>Shipping Address:</strong>
                    <span>{order.shippingAddress}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
