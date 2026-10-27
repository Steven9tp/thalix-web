import React from "react";
import { ProductCard } from "../components/ProductCard";
import { ShopLayout } from "../components/ShopLayout";
import { SYSTEMS_PRODUCTS } from "../constants";
import { View, Product } from "../types";

interface SystemsShopViewProps {
  setCurrentView: (view: View) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  products?: Product[];
}

const SYSTEMS_HEADER_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
];

export const SystemsShopView = ({ 
  setCurrentView, 
  onAddToCart, 
  onBuyNow, 
  onViewDetail,
  products = SYSTEMS_PRODUCTS 
}: SystemsShopViewProps) => {
  return (
    <ShopLayout 
      title="Systems" 
      subtitle="Give All You Need" 
      category="Tech"
      setCurrentView={setCurrentView}
      headerImages={SYSTEMS_HEADER_IMAGES}
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
