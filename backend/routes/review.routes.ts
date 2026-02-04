import { Router } from "express";
import {
  getProductReviews,
  createReview,
  deleteReview,
} from "../controllers/review.controller.ts";

export const reviewRouter = Router();

reviewRouter.get("/:productId", getProductReviews);
reviewRouter.post("/", createReview);
reviewRouter.delete("/:id", deleteReview);
