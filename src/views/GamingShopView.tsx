import React from "react";
import { ProductCard } from "../components/ProductCard";
import { ShopLayout } from "../components/ShopLayout";
import { GAMING_PRODUCTS } from "../constants";
import { View, Product } from "../types";

interface GamingShopViewProps {
  setCurrentView: (view: View) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetail?: (product: Product) => void;
  products?: Product[];
}

const GAMING_HEADER_IMAGES = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
];

export const GamingShopView = ({ 
  setCurrentView, 
  onAddToCart, 
  onBuyNow, 
  onViewDetail,
  products = GAMING_PRODUCTS 
}: GamingShopViewProps) => {
  return (
    <ShopLayout 
      title="Gaming" 
      subtitle="Give All You Need" 
      category="Meta"
      setCurrentView={setCurrentView}
      headerImages={GAMING_HEADER_IMAGES}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={i} 
            onAdd={() => onAddToCart(product)} 
            onBuyNow={() => onBuyNow(product)}
            onDetail={onViewDetail ? (() => onViewDetail(product)) : undefined}
          />
        ))}
      </div>
    </ShopLayout>
  );
};
