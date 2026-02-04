import type { Request, Response } from "express";
import "../types/express.ts";
import { Product } from "../models/Product.ts";
import { Op } from "sequelize";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const offset = ((Number(page) || 1) - 1) * (Number(limit) || 12);

    let where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where = {
        ...where,
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const products = await Product.findAndCountAll({
      where,
      limit: Number(limit) || 12,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: products.rows,
      total: products.count,
      pages: Math.ceil(products.count / (Number(limit) || 12)),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error fetching products",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error fetching product",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, originalPrice, stock, category, image } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      stock,
      category,
      image,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error creating product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, originalPrice, stock, category, image } =
      req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    await product.update({
      name,
      description,
      price,
      originalPrice,
      stock,
      category,
      image,
    });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error updating product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    await product.destroy();
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Error deleting product",
    });
  }
};
