import React from "react";
import { ProductCard } from "../components/ProductCard";
import { ShopLayout } from "../components/ShopLayout";
import { FASHION_PRODUCTS } from "../constants";
import { View, Product } from "../types";

interface FashionShopViewProps {
  setCurrentView: (view: View) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  products?: Product[];
}

const FASHION_HEADER_IMAGES = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200"
];

export const FashionShopView = ({ 
  setCurrentView, 
  onAddToCart, 
  onBuyNow, 
  onViewDetail,
  products = FASHION_PRODUCTS 
}: FashionShopViewProps) => {
  return (
    <ShopLayout 
      title="Fashion" 
      subtitle="Give All You Need" 
      category="Style"
      setCurrentView={setCurrentView}
      headerImages={FASHION_HEADER_IMAGES}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={i} 
            onAdd={() => onAddToCart(product)} 
            onBuyNow={() => onBuyNow(product)}
            onDetail={() => onViewDetail(product)}
          />
        ))}
      </div>
    </ShopLayout>
  );
};
