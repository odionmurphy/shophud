import type { Request, Response } from "express";
import "../types/express.ts";
import { Order } from "../models/Order.ts";
import { OrderItem } from "../models/OrderItem.ts";
import { Cart } from "../models/Cart.ts";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error fetching orders",
    });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: "items" }],
    });

    if (!order || order.userId !== userId) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error fetching order",
    });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { shippingAddress, paymentMethod } = req.body;

    const cartItems = await Cart.findAll({ where: { userId } });
    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    let totalAmount = 0;
    const order = await Order.create({
      userId,
      totalAmount: 0,
      shippingAddress,
      paymentMethod,
    });

    for (const cartItem of cartItems) {
      // In production, fetch product details here
      totalAmount += 0;
      await OrderItem.create({
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: 0, // Should fetch actual price
      });
    }

    await order.update({ totalAmount });
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error creating order",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    await order.update({ status });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error updating order",
    });
  }
};
