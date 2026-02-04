# ShopHub Backend API

Express.js backend for the ShopHub e-commerce platform with PostgreSQL database using Sequelize ORM.

## Setup

```bash
bun install
bun run dev
```

## API Routes

### Products API

- `GET /api/products` - Get all products (with pagination, filtering, search)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart API

- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders API

- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Reviews API

- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/:id` - Delete review

### Users API

- Authentication endpoints in user.routes.ts

## Database Models

- User
- Product
- Cart
- Order
- OrderItem
- Review
- Category

## Features

- ✅ Product CRUD operations
- ✅ Shopping cart management
- ✅ Order processing
- ✅ Product reviews and ratings
- ✅ Category management
- ✅ Pagination and filtering
- ✅ Error handling
- ✅ Data validation

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
