import { Product } from "../models/Product.ts";
import { Category } from "../models/Category.ts";

export const seedDatabase = async () => {
  try {
    // Check if products already exist
    const count = await Product.count();
    if (count > 0) {
      console.log("Database already seeded");
      return;
    }

    // Create categories
    const categories = await Category.bulkCreate([
      {
        name: "Electronics",
        description: "Electronic devices and gadgets",
        icon: "📱",
      },
      {
        name: "Fashion",
        description: "Clothing and accessories",
        icon: "👕",
      },
      {
        name: "Home & Garden",
        description: "Home and garden products",
        icon: "🏠",
      },
      {
        name: "Sports",
        description: "Sports and outdoor equipment",
        icon: "⚽",
      },
    ]);

    // Create sample products
    const products = [
      {
        name: "Wireless Headphones",
        description:
          "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        originalPrice: 299.99,
        stock: 50,
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        rating: 4.5,
        reviews: 128,
      },
      {
        name: "Running Shoes",
        description:
          "Professional running shoes with responsive cushioning and breathable mesh.",
        price: 89.99,
        originalPrice: 129.99,
        stock: 100,
        category: "Sports",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        rating: 4.8,
        reviews: 256,
      },
      {
        name: "Smart Watch",
        description:
          "Feature-rich smartwatch with heart rate monitor and activity tracking.",
        price: 249.99,
        originalPrice: 399.99,
        stock: 75,
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        rating: 4.3,
        reviews: 189,
      },
      {
        name: "Yoga Mat",
        description:
          "Non-slip yoga mat with carrying strap, perfect for indoor and outdoor workouts.",
        price: 34.99,
        stock: 200,
        category: "Sports",
        image:
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        rating: 4.6,
        reviews: 342,
      },
      {
        name: "Desk Lamp",
        description:
          "LED desk lamp with adjustable brightness and USB charging port.",
        price: 49.99,
        originalPrice: 79.99,
        stock: 120,
        category: "Home & Garden",
        image:
          "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop",
        rating: 4.4,
        reviews: 95,
      },
      {
        name: "Cotton T-Shirt",
        description:
          "Premium quality 100% cotton t-shirt, available in multiple colors.",
        price: 24.99,
        originalPrice: 49.99,
        stock: 300,
        category: "Fashion",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        rating: 4.2,
        reviews: 428,
      },
      {
        name: "Portable Speaker",
        description:
          "Waterproof Bluetooth speaker with 12-hour battery and 360-degree sound.",
        price: 79.99,
        originalPrice: 149.99,
        stock: 85,
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        rating: 4.7,
        reviews: 267,
      },
      {
        name: "Denim Jeans",
        description:
          "Classic blue denim jeans with perfect fit and premium comfort.",
        price: 59.99,
        originalPrice: 99.99,
        stock: 150,
        category: "Fashion",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
        rating: 4.5,
        reviews: 523,
      },
      {
        name: "Coffee Maker",
        description:
          "Programmable coffee maker with thermal carafe and automatic shut-off.",
        price: 69.99,
        stock: 60,
        category: "Home & Garden",
        image:
          "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop",
        rating: 4.3,
        reviews: 167,
      },
      {
        name: "USB-C Cable",
        description:
          "Fast charging USB-C cable with durable braided nylon coating.",
        price: 12.99,
        originalPrice: 19.99,
        stock: 500,
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
        rating: 4.6,
        reviews: 1240,
      },
    ];

    await Product.bulkCreate(products);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
