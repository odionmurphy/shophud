import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiStar, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { productService, reviewService } from "../services/api";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCartStore } from "../store";
import "./ProductDetailPage.css";
import "./ReviewSection.css";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productRes = await productService.getById(Number(id));
        setProduct(productRes.data.data);

        const reviewsRes = await reviewService.getByProduct(Number(id));
        setReviews(reviewsRes.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        userId: 0,
        productId: product.id,
        quantity,
        product,
      });
      alert("Added to cart!");
    }
  };

  const handleAddReview = async () => {
    try {
      await reviewService.create({
        productId: Number(id),
        rating,
        comment,
      });
      setComment("");
      setRating(5);
      // Refresh reviews
      const reviewsRes = await reviewService.getByProduct(Number(id));
      setReviews(reviewsRes.data.data);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!product)
    return <div className="product-not-found">Product not found</div>;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="product-breadcrumb">
        <FiArrowLeft /> Back
      </button>

      <div className="product-detail-grid">
        <div>
          <div className="product-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-info-title">{product.name}</h1>

          <div className="product-info-rating">
            <div className="product-info-stars">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < product.rating ? "product-info-star" : ""}
                />
              ))}
            </div>
            <span className="product-info-review-count">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="product-info-pricing">
            <div className="product-detail-price">${product.price}</div>
            {product.originalPrice && (
              <div className="product-original-price-detail">
                ${product.originalPrice}
              </div>
            )}
            <p
              className={`product-stock-status ${
                product.stock > 0
                  ? "product-stock-available"
                  : "product-stock-unavailable"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          <p className="product-info-description">{product.description}</p>

          <div className="product-quantity-section">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="product-add-to-cart-btn"
            >
              <FiShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="reviews-title">Customer Reviews</h2>

        <div className="review-form-section">
          <h3 className="review-form-title">Write a Review</h3>
          <div className="review-form-group">
            <div className="review-form-input-group">
              <label className="review-form-label">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="review-form-select"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>
            <div className="review-form-input-group">
              <label className="review-form-label">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-form-textarea"
                placeholder="Share your experience..."
              />
            </div>
            <button onClick={handleAddReview} className="review-submit-btn">
              Submit Review
            </button>
          </div>
        </div>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews-text">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < review.rating ? "review-star" : ""}
                      />
                    ))}
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
