import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.ts";

export const cartRouter = Router();

cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.put("/:id", updateCartItem);
cartRouter.delete("/:id", removeFromCart);
cartRouter.delete("/", clearCart);
