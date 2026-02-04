import { Router } from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} from "../controllers/order.controller.ts";

export const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
orderRouter.put("/:id/status", updateOrderStatus);
