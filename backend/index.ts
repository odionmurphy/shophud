import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { userRouter } from "./routes/user.routes.ts";
import { productRouter } from "./routes/product.routes.ts";
import { cartRouter } from "./routes/cart.routes.ts";
import { orderRouter } from "./routes/order.routes.ts";
import { reviewRouter } from "./routes/review.routes.ts";
import { db } from "./libs/db.ts";
import { seedDatabase } from "./libs/seed.ts";

// Import all models to ensure they're registered with Sequelize
import "./models/User.ts";
import "./models/Product.ts";
import "./models/Category.ts";
import "./models/Cart.ts";
import "./models/Order.ts";
import "./models/OrderItem.ts";
import "./models/Review.ts";

const app = express();
const port = process.env.PORT || 3001;

// connect db
try {
  await db.authenticate();
  console.log("db connected");
} catch (error) {
  console.log(error);
}
await db.sync({ force: false, alter: true }).catch((error: any) => {
  console.warn("Database sync warning:", error.message);
});

// Seed database with initial data
await seedDatabase();

// middleware
const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
  }),
);
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("E-commerce API Server running");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

// error handlers

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
