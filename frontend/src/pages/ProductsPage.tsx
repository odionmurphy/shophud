import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductFilter } from "../components/ProductFilter";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { productService } from "../services/api";
import { useCartStore } from "../store";
import "./ProductsPage.css";

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll({
          category: selectedCategory || undefined,
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
  );

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="products-container">
      <h1 className="products-title">Our Products</h1>

      <div className="products-layout">
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          priceRange={priceRange}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceRange}
        />

        <div className="products-content">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="products-count">
                Showing {filteredProducts.length} products
              </div>
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
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
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
