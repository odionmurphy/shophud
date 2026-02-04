import React, { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { productService } from "../services/api";
import { useCartStore } from "../store";
import { FiTrendingUp } from "react-icons/fi";
import "./DealsPage.css";

export const DealsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll();
        // Filter products with discounts (originalPrice is higher than price)
        const dealsProducts = response.data.data.filter(
          (p: any) => p.originalPrice && p.originalPrice > p.price,
        );
        // Sort by discount percentage (highest first)
        dealsProducts.sort((a: any, b: any) => {
          const discountA =
            ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discountB =
            ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discountB - discountA;
        });
        setProducts(dealsProducts);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="deals-container">
      {/* Hero Section */}
      <div className="deals-hero">
        <div className="deals-hero-header">
          <FiTrendingUp className="deals-hero-icon" />
          <h1 className="deals-hero-title">Exclusive Deals & Discounts</h1>
        </div>
        <p className="deals-hero-subtitle">
          Don't miss out! Get up to 70% off on selected items. Limited time
          offers!
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <div className="deals-empty">
          <p className="deals-empty-text">No deals available at the moment</p>
        </div>
      ) : (
        <div className="deals-section">
          <div className="deals-section-title">
            Showing {products.length} amazing deals
          </div>

          <div className="deals-grid">
            {products.map((product) => {
              const discount = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )
                : 0;

              return (
                <div key={product.id} className="relative">
                  {discount > 0 && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{discount}%
                      </div>
                    </div>
                  )}
                  <ProductCard
                    {...product}
                    onAddToCart={() =>
                      addToCart({
                        id: product.id,
                        userId: 0,
                        productId: product.id,
                        quantity: 1,
                        product,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Why Shop Our Deals?</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">🎯 Best Prices</h3>
            <p className="text-gray-600">
              We guarantee the lowest prices on all discounted items
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">⚡ Limited Time</h3>
            <p className="text-gray-600">
              Offers are only available for a limited period
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">✅ Quality Items</h3>
            <p className="text-gray-600">
              All items are genuine and come with warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
