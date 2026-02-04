import type { Request, Response } from "express";
import "../types/express.ts";
import { Cart } from "../models/Cart.ts";
import { Product } from "../models/Product.ts";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: "product" }],
    });

    res.json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error fetching cart",
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({
      where: { userId, productId },
    });

    if (existingItem) {
      await existingItem.update({
        quantity: existingItem.quantity + (quantity || 1),
      });
      return res.json({ success: true, data: existingItem });
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity: quantity || 1,
    });

    res.status(201).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error adding to cart",
    });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(id);
    if (!cartItem || cartItem.userId !== userId) {
      return res
        .status(404)
        .json({ success: false, error: "Cart item not found" });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      return res.json({ success: true, message: "Item removed from cart" });
    }

    await cartItem.update({ quantity });
    res.json({ success: true, data: cartItem });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error updating cart",
    });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { id } = req.params;
    const cartItem = await Cart.findByPk(id);

    if (!cartItem || cartItem.userId !== userId) {
      return res
        .status(404)
        .json({ success: false, error: "Cart item not found" });
    }

    await cartItem.destroy();
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Error removing from cart",
    });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    await Cart.destroy({ where: { userId } });
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error clearing cart",
    });
  }
};
