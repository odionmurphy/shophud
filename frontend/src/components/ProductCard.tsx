import React from "react";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./ProductCard.css";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  onAddToCart,
}) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        {discount > 0 && (
          <div className="product-discount-badge">-{discount}%</div>
        )}
      </div>

      <div className="product-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-title">{name}</h3>
        </Link>

        <div className="product-rating">
          <div className="product-stars">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={16}
                className={
                  i < Math.round(rating)
                    ? "product-star-filled"
                    : "product-star-empty"
                }
              />
            ))}
          </div>
          <span className="product-reviews">({reviews})</span>
        </div>

        <div className="product-prices">
          <span className="product-price">${Number(price).toFixed(2)}</span>
          {originalPrice && (
            <span className="product-original-price">
              ${Number(originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        <button onClick={onAddToCart} className="product-add-cart">
          <FiShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};
