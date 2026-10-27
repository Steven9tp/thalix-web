import React from "react";
import { ProductCard } from "../components/ProductCard";
import { ShopLayout } from "../components/ShopLayout";
import { PersonalizedSection } from "../components/PersonalizedSection";
import { MDF_PRODUCTS } from "../constants";
import { View, Product } from "../types";

interface MDFShopViewProps {
  setCurrentView: (view: View) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  products?: Product[];
}

const MDF_HEADER_IMAGES = [
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1581447100595-3773d52d302f?auto=format&fit=crop&q=80&w=1200"
];

export const MDFShopView = ({ 
  setCurrentView, 
  onAddToCart, 
  onBuyNow, 
  onViewDetail,
  products = MDF_PRODUCTS 
}: MDFShopViewProps) => {
  return (
    <ShopLayout 
      title="MDF Craft" 
      subtitle="Give All You Need" 
      category="Craft"
      setCurrentView={setCurrentView}
      headerImages={MDF_HEADER_IMAGES}
      topContent={<PersonalizedSection onExplore={() => setCurrentView('personalized')} />}
    >
      {/* Separator / Section Title */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.5em] text-black/40 font-bold mb-4 block">Catálogo de Productos</span>
        <h3 className="text-4xl font-display font-bold uppercase tracking-tighter font-medium text-black">Nuestras Creaciones</h3>
      </div>

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
