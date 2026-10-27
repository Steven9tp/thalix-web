import React from "react";
import { motion } from "motion/react";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../types";

export const ProductCard = ({ 
  product, 
  index, 
  onAdd, 
  onBuyNow, 
  onDetail 
}: { 
  product: Product; 
  index: number; 
  onAdd: () => void; 
  onBuyNow?: () => void; 
  onDetail?: () => void; 
}) => {
  // Static image only: stays completely still across all stores
  const productImage = product.image || (product.images && product.images[0]) || '';
  const isFashion = product.category === 'fashion';

  // Extract unique colors across all sizes for fashion preview
  const allColors = isFashion && product.sizes
    ? Array.from(
        new Map(
          product.sizes.flatMap(s => s.colors).map(c => [c.name, c])
        ).values()
      )
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group flex flex-col bg-white rounded-[2rem] p-5 transition-all duration-300 border border-zinc-200/80 hover:border-zinc-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] relative"
    >
      {/* Product Image Stage - completely still */}
      <div className="relative aspect-square mb-4 bg-[#F4F6F9] rounded-[1.5rem] overflow-hidden flex items-center justify-center p-6 border border-zinc-100 transition-colors">
        
        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10 pointer-events-none">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-extrabold uppercase tracking-widest text-black shadow-sm border border-zinc-200/60">
            {product.category}
          </span>
          {product.stock === 0 && (
            <span className="px-3 py-1 bg-zinc-800 text-white rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm">
              Bajo Pedido
            </span>
          )}
        </div>
        
        {/* Static Product Image */}
        <img 
          src={productImage} 
          className={`w-full h-full object-contain drop-shadow-md transition-opacity duration-300 ${product.stock === 0 ? 'opacity-60 grayscale' : ''}`} 
          alt={product.name} 
          loading="lazy"
          referrerPolicy="no-referrer" 
        />

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            type="button"
            onClick={onDetail}
            className="px-5 py-2.5 bg-white text-black rounded-full text-[9px] font-extrabold uppercase tracking-widest hover:bg-zinc-200 hover:scale-105 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> Detalle
          </button>
        </div>
      </div>
      
      {/* Details & Pricing */}
      <div className="space-y-3 px-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="text-sm font-bold uppercase tracking-tight text-black line-clamp-1 leading-snug group-hover:text-zinc-700 transition-colors">
              {product.name}
            </h3>
            <span className="text-sm font-extrabold text-black whitespace-nowrap">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[10px] font-bold text-zinc-900">{product.rating || 5.0}</span>
            </div>
            <span className="text-[10px] text-zinc-600 font-medium">({product.reviews || '0 reseñas'})</span>
          </div>

          {/* Fashion Variants Preview: Available Sizes & Colors */}
          {isFashion && product.sizes && (
            <div className="pt-1 pb-1 space-y-2 border-t border-zinc-100">
              {/* Sizes preview */}
              <div className="flex items-center justify-between gap-1 text-[9px]">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[8px]">Tallas:</span>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((s) => (
                    <span 
                      key={s.size}
                      className="px-1.5 py-0.5 bg-zinc-100 text-zinc-800 rounded font-semibold text-[8px] border border-zinc-200/60"
                    >
                      {s.size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color dots preview */}
              {allColors.length > 0 && (
                <div className="flex items-center justify-between gap-1">
                  <span className="text-zinc-400 font-bold uppercase tracking-wider text-[8px]">Colores:</span>
                  <div className="flex items-center gap-1.5">
                    {allColors.slice(0, 5).map((col) => (
                      <span 
                        key={col.name}
                        title={col.name}
                        className="w-3 h-3 rounded-full border border-zinc-300 shadow-2xs"
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                    {allColors.length > 5 && (
                      <span className="text-[8px] text-zinc-500 font-medium">+{allColors.length - 5}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isFashion ? (
          /* Fashion store: No 'Comprar Ya' button; 'Al Carrito' opens details to pick size and color */
          <div className="pt-2">
            <button 
              type="button"
              onClick={onDetail} 
              className="w-full py-2.5 px-4 bg-black text-white hover:bg-zinc-800 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Al Carrito</span>
            </button>
          </div>
        ) : (
          /* Standard dual buttons for other store categories */
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button 
              type="button"
              onClick={product.stock === 0 ? onDetail : onAdd} 
              className="py-2.5 px-3 border border-zinc-300 hover:border-black rounded-xl text-[9px] font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all text-center cursor-pointer"
            >
              {product.stock === 0 ? 'Detalles' : 'Al Carrito'}
            </button>
            <button 
              type="button"
              onClick={product.stock === 0 ? onDetail : onBuyNow} 
              className="py-2.5 px-3 bg-black text-white hover:bg-zinc-800 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all shadow-md text-center cursor-pointer"
            >
              {product.stock === 0 ? 'Bajo Pedido' : 'Comprar Ya'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
