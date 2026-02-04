import type { Request, Response } from "express";
import "../types/express.ts";
import { Review } from "../models/Review.ts";

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findAll({
      where: { productId },
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error fetching reviews",
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { productId, rating, comment } = req.body;

    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error creating review",
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review || review.userId !== userId) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }

    await review.destroy();
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error deleting review",
    });
  }
};
