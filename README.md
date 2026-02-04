# ShopHub - E-Commerce Platform

A modern, full-stack e-commerce application built with TypeScript, React, Express, and PostgreSQL. Featuring a beautiful UI, product catalog, shopping cart, checkout system, and order management.

## Features

✨ **Core Features:**

- 🏠 Beautiful home page with featured categories
- 🛍️ Product catalog with filtering and search
- 📦 Detailed product pages with reviews and ratings
- 🛒 Shopping cart management
- 💳 Secure checkout process
- 📋 Order tracking and history
- ⭐ Product reviews and ratings
- 🎨 Modern, responsive UI design

## Tech Stack

### Backend

- **Runtime:** Bun
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Sequelize ORM
- **Authentication:** JWT (Cookie-based)
- **Security:** Helmet, CORS, Validator

### Frontend

- **Framework:** React 19
- **Language:** TypeScript
- **Routing:** React Router v7
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** Zustand
- **Icons:** React Icons

## Project Structure

```
SQL_fullstack/
├── backend/
│   ├── controllers/
│   │   ├── product.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   ├── review.controller.ts
│   │   └── user.controller.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Cart.ts
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   ├── Review.ts
│   │   └── Category.ts
│   ├── routes/
│   │   ├── product.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   ├── review.routes.ts
│   │   └── user.routes.ts
│   ├── libs/
│   │   └── db.ts
│   ├── middleware/
│   ├── index.ts
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductFilter.tsx
    │   │   └── LoadingSpinner.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── ProductsPage.tsx
    │   │   ├── ProductDetailPage.tsx
    │   │   ├── CartPage.tsx
    │   │   ├── CheckoutPage.tsx
    │   │   └── OrdersPage.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── store/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── vite.config.ts
    ├── package.json
    └── index.html
```

## Getting Started

### Prerequisites

- Bun runtime installed
- PostgreSQL database running
- Node.js 18+ (for npm packages)

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
bun install
```

3. Create `.env` file (if needed for database config)

4. Start development server:

```bash
bun run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
bun install
```

3. Start development server:

```bash
bun run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Products

- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders

- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Reviews

- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/:id` - Delete review

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user

## Database Models

### User

- id, email, password, role, createdAt

### Product

- id, name, description, price, originalPrice, stock, category, image, rating, reviews, createdAt

### Cart

- id, userId, productId, quantity, createdAt

### Order

- id, userId, totalAmount, status, shippingAddress, paymentMethod, createdAt

### OrderItem

- id, orderId, productId, quantity, price, createdAt

### Review

- id, productId, userId, rating, comment, createdAt

### Category

- id, name, description, icon, createdAt

## Frontend Pages

- **Home** (`/`) - Landing page with featured categories
- **Products** (`/products`) - Product catalog with filters
- **Product Detail** (`/product/:id`) - Individual product page with reviews
- **Cart** (`/cart`) - Shopping cart review and management
- **Checkout** (`/checkout`) - Shipping and payment information
- **Orders** (`/orders`) - Order history and tracking

## Features in Detail

### Product Catalog

- Browse all products
- Filter by category
- Filter by price range
- Search functionality
- Product ratings and reviews
- Discount display

### Shopping Cart

- Add/remove products
- Update quantities
- Calculate totals with tax
- Free shipping on orders over $50
- Persistent cart state (in memory)

### Checkout

- Shipping address form
- Payment information
- Order summary
- Real-time total calculation

### Order Management

- View order history
- Track order status
- View order details and items
- Track shipping information

### Reviews System

- Read product reviews
- Submit ratings and comments
- View average rating
- Review count display

## Styling & UI

- **Responsive Design:** Mobile-first approach
- **Tailwind CSS:** Utility-first CSS framework
- **Icons:** React Icons library
- **Color Scheme:** Blue primary color with neutral grays
- **Typography:** Clean, modern font hierarchy

## State Management

Using Zustand for:

- Shopping cart state
- User authentication state
- Cart operations (add, remove, update quantity)

## Future Enhancements

- 🔐 User authentication with JWT
- 🏪 Admin dashboard for product management
- 📧 Email notifications
- 💰 Multiple payment gateways
- 📊 Analytics and reporting
- 🌐 Multi-language support
- 🔍 Advanced search and filters
- 📦 Inventory management
- 🚚 Real-time shipping tracking
- ⭐ Wishlist functionality

## Contributing

Feel free to fork and submit pull requests for any improvements.

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

---

Made with ❤️ for great e-commerce experiences
