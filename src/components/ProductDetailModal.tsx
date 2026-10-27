import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, CheckCircle2, Zap, AlertCircle, Info, Check } from 'lucide-react';
import { Product, FashionSizeOption, FashionColorOption } from '../types';
import { STORE_INFO } from '../constants';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, options?: { 
    option?: string; 
    selectedSize?: string;
    selectedColor?: string;
    plan?: string; 
    isReservation?: boolean; 
    reservationAmount?: number 
  }) => void;
  onBuyNow: (product: Product, options?: { 
    option?: string; 
    selectedSize?: string;
    selectedColor?: string;
    plan?: string; 
    isReservation?: boolean; 
    reservationAmount?: number 
  }) => void;
}

export const ProductDetailModal = ({ product, onClose, onAddToCart, onBuyNow }: ProductDetailModalProps) => {
  const isFashion = product?.category === 'fashion';

  // MDF / General options state
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [paymentType, setPaymentType] = useState<'total' | 'reservation'>('total');

  // Fashion specific states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Reset or initialize options whenever the active product changes
  useEffect(() => {
    if (!product) return;

    if (isFashion && product.sizes && product.sizes.length > 0) {
      const firstSize = product.sizes[0];
      setSelectedSize(firstSize.size);
      // Pick first color with stock or first color
      const inStockColor = firstSize.colors.find(c => c.stock > 0) || firstSize.colors[0];
      setSelectedColor(inStockColor?.name || '');
    } else {
      setSelectedOption(product.options?.[0] || null);
    }
  }, [product, isFashion]);

  if (!product) return null;

  // Compute current size & color objects for fashion
  const currentSizeObj: FashionSizeOption | undefined = isFashion && product.sizes
    ? product.sizes.find(s => s.size === selectedSize) || product.sizes[0]
    : undefined;

  const currentColorObj: FashionColorOption | undefined = currentSizeObj
    ? currentSizeObj.colors.find(c => c.name === selectedColor) || currentSizeObj.colors[0]
    : undefined;

  // Handle switching size in fashion: keep color if available in new size, else fallback to first available color
  const handleSelectSize = (sizeName: string) => {
    setSelectedSize(sizeName);
    const newSizeObj = product.sizes?.find(s => s.size === sizeName);
    if (newSizeObj) {
      const matchingColor = newSizeObj.colors.find(c => c.name === selectedColor);
      if (!matchingColor) {
        const firstInStock = newSizeObj.colors.find(c => c.stock > 0) || newSizeObj.colors[0];
        setSelectedColor(firstInStock ? firstInStock.name : '');
      }
    }
  };

  // Stock calculation
  const currentStock = isFashion && currentColorObj !== undefined
    ? currentColorObj.stock
    : (product.stock ?? 10);

  const isOutOfStock = currentStock <= 0;

  // Pricing
  const currentPrice = product.options && selectedOption?.priceModifier !== undefined
    ? (product.price + selectedOption.priceModifier)
    : product.price;

  const reservationAmount = currentPrice * STORE_INFO.reservationPercentage;
  const isReservation = !isFashion && isOutOfStock && paymentType === 'reservation';
  const displayPrice = isReservation ? reservationAmount : currentPrice;

  // Image display
  const currentImage = isFashion && currentColorObj?.image
    ? currentColorObj.image
    : (selectedOption?.image || product.image || (product.images && product.images[0]) || '');

  const handleAdd = () => {
    if (isFashion) {
      if (isOutOfStock) return;
      onAddToCart({
        ...product,
        price: currentPrice,
        image: currentImage,
      }, {
        option: `Talla ${selectedSize} • ${selectedColor}`,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      });
    } else {
      onAddToCart({
        ...product,
        price: currentPrice,
        image: currentImage
      }, { 
        option: typeof selectedOption === 'string' ? selectedOption : selectedOption?.name, 
        plan: selectedPlan,
        isReservation: isReservation,
        reservationAmount: isReservation ? reservationAmount : undefined
      });
    }
    onClose();
  };

  const handleBuyNow = () => {
    onBuyNow({
      ...product,
      price: currentPrice,
      image: currentImage
    }, { 
      option: typeof selectedOption === 'string' ? selectedOption : selectedOption?.name, 
      plan: selectedPlan,
      isReservation: isReservation,
      reservationAmount: isReservation ? reservationAmount : undefined
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
          >
            <button 
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Sección de Imagen */}
            <div className="md:w-1/2 bg-[#F4F6F9] relative overflow-hidden flex items-center justify-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-zinc-100 min-h-[300px] md:min-h-full">
              <motion.img 
                key={currentImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                src={currentImage} 
                alt={product.name}
                className="w-full h-full max-h-[460px] object-contain drop-shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-extrabold uppercase tracking-widest text-black shadow-sm border border-zinc-200/60">
                  {product.category === 'fashion' ? 'Moda & Ropa' : product.category === 'mdf' ? 'Artesanía MDF' : product.category}
                </span>
                {isOutOfStock && (
                  <span className="px-3.5 py-1.5 bg-zinc-900 text-white rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 text-rose-400" /> Agotado
                  </span>
                )}
              </div>
            </div>

            {/* Sección de Contenido */}
            <div className="md:w-1/2 p-6 md:p-10 lg:p-12 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-zinc-500">{product.rating || 5.0} ({product.reviews || '0 reseñas'})</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-black leading-tight mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-display font-extrabold text-black">${displayPrice.toFixed(2)}</p>
                    {isReservation && (
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        (Reserva del {STORE_INFO.reservationPercentage * 100}%)
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Descripción</h4>
                  <p className="text-zinc-600 leading-relaxed text-sm">
                    {product.longDescription || product.description}
                  </p>
                </div>

                {/* SELECCIÓN PARA TIENDA DE ROPA (TALLA + COLOR + STOCK DINÁMICO) */}
                {isFashion && product.sizes && (
                  <div className="space-y-5 py-4 border-y border-zinc-100">
                    
                    {/* 1. Selector de Talla */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-black">
                          1. Selecciona tu Talla
                        </h4>
                        <span className="text-[10px] font-bold text-zinc-500">
                          Talla elegida: <strong className="text-black">{selectedSize}</strong>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => {
                          const isSelected = selectedSize === s.size;
                          const hasAnyStock = s.colors.some(c => c.stock > 0);
                          return (
                            <button
                              key={s.size}
                              type="button"
                              onClick={() => handleSelectSize(s.size)}
                              className={`min-w-[48px] px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                                isSelected 
                                  ? 'bg-black text-white border-black shadow-sm scale-105' 
                                  : 'bg-white text-zinc-800 border-zinc-200 hover:border-black/50'
                              } ${!hasAnyStock ? 'opacity-50 line-through' : ''}`}
                            >
                              {s.size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Selector de Color según la Talla seleccionada */}
                    {currentSizeObj && (
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-black">
                            2. Colores disponibles en talla {selectedSize}
                          </h4>
                          <span className="text-[10px] font-bold text-zinc-500">
                            Color: <strong className="text-black">{selectedColor}</strong>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentSizeObj.colors.map((color) => {
                            const isSelected = selectedColor === color.name;
                            const isColorOutOfStock = color.stock <= 0;
                            return (
                              <button
                                key={color.name}
                                type="button"
                                onClick={() => setSelectedColor(color.name)}
                                className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer ${
                                  isSelected 
                                    ? 'border-black bg-zinc-900 text-white shadow-md' 
                                    : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span 
                                    className="w-4 h-4 rounded-full border border-white/40 shadow-xs shrink-0" 
                                    style={{ backgroundColor: color.hex }}
                                  />
                                  <span className="text-xs font-bold truncate">
                                    {color.name}
                                  </span>
                                </div>
                                <span className={`text-[9px] font-bold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded-full ${
                                  isColorOutOfStock 
                                    ? (isSelected ? 'bg-rose-900/60 text-rose-300' : 'bg-rose-50 text-rose-600')
                                    : (isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700')
                                }`}>
                                  {isColorOutOfStock ? 'Agotado' : `${color.stock} disp.`}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Indicador de Disponibilidad y Stock en tiempo real */}
                    <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${!isOutOfStock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        <span className="text-xs font-bold text-zinc-900">
                          {!isOutOfStock 
                            ? `${currentStock} prendas disponibles (${selectedSize} - ${selectedColor})`
                            : `Agotado en talla ${selectedSize} (${selectedColor})`}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                        Envío Inmediato
                      </span>
                    </div>

                  </div>
                )}

                {/* Información de Stock y Entrega para No-Fashion */}
                {!isFashion && (
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100">
                    <div className="space-y-1">
                      <h4 className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Disponibilidad</h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${!isOutOfStock ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-xs font-bold uppercase tracking-tight">
                          {!isOutOfStock ? `${product.stock} en stock` : 'Disponible Bajo Pedido'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Tiempo de Entrega</h4>
                      <span className="text-xs font-bold uppercase tracking-tight">
                        {!isOutOfStock 
                          ? (product.category === 'mdf' ? '3 días hábiles' : 'Inmediata')
                          : (product.category === 'mdf' ? '5 - 15 días laborables' : 'Consultar')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Opciones de MDF */}
                {product.category === 'mdf' && product.options && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Acabado / Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.options.map((option: any) => {
                        const optionName = typeof option === 'string' ? option : option.name;
                        const isSelected = typeof selectedOption === 'string' 
                          ? selectedOption === option 
                          : selectedOption?.name === optionName;
                        
                        return (
                          <button
                            key={optionName}
                            type="button"
                            onClick={() => setSelectedOption(option)}
                            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border cursor-pointer ${
                              isSelected 
                                ? 'bg-black text-white border-black' 
                                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                            }`}
                          >
                            {optionName}
                            {option.priceModifier > 0 && (
                              <span className="ml-2 text-[8px] opacity-60">
                                +${option.priceModifier.toFixed(2)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Opciones de Pago para Bajo Pedido MDF */}
                {isOutOfStock && product.category === 'mdf' && (
                  <div className="space-y-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-black" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest">Opciones de Pedido</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentType('total')}
                        className={`p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                          paymentType === 'total' 
                            ? 'border-black bg-black text-white shadow-lg' 
                            : 'border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300'
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Pago Total</p>
                        <p className="text-lg font-display font-bold">100%</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentType('reservation')}
                        className={`p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                          paymentType === 'reservation' 
                            ? 'border-black bg-black text-white shadow-lg' 
                            : 'border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300'
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Reserva</p>
                        <p className="text-lg font-display font-bold">{STORE_INFO.reservationPercentage * 100}%</p>
                      </button>
                    </div>

                    {paymentType === 'reservation' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 pt-2"
                      >
                        <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-zinc-200">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Valor a Pagar Ahora:</span>
                          <span className="text-xl font-display font-bold text-black">${reservationAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-[9px] text-amber-800 leading-relaxed font-bold uppercase tracking-widest">
                              Política de Reserva:
                            </p>
                            <p className="text-[8px] text-amber-800/80 leading-relaxed uppercase tracking-widest">
                              • El valor restante se cancela al momento de la entrega.<br />
                              • Penalidad por cancelación: {STORE_INFO.cancellationPenaltyPercentage * 100}% del valor total.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Planes de Sistemas */}
                {product.category === 'systems' && product.plans && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Planes de Suscripción</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {product.plans.map(plan => (
                        <button
                          key={plan.name}
                          type="button"
                          onClick={() => setSelectedPlan(plan.name)}
                          className={`p-4 rounded-2xl text-left transition-all border flex items-center justify-between group cursor-pointer ${
                            selectedPlan === plan.name 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1">{plan.name}</p>
                            <p className={`text-[10px] ${selectedPlan === plan.name ? 'text-zinc-300' : 'text-zinc-500'}`}>
                              Facturación {plan.period === 'monthly' ? 'mensual' : 'anual'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">${plan.price}</p>
                            {plan.period === 'yearly' && (
                              <span className="text-[8px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                                Ahorra 15%
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botones de Acción */}
                {isFashion ? (
                  /* Ropa / Moda: Un solo botón principal 'Añadir al Carrito' (Sin botón Comprar Ya) */
                  <div className="pt-4 space-y-3">
                    <button 
                      type="button"
                      onClick={handleAdd}
                      disabled={isOutOfStock}
                      className={`w-full px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-[0.25em] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md ${
                        isOutOfStock 
                          ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
                          : 'bg-black text-white hover:bg-zinc-800 active:scale-98'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isOutOfStock 
                        ? 'Combinación Agotada' 
                        : `Añadir al Carrito (${selectedSize} • ${selectedColor})`}
                    </button>
                  </div>
                ) : (
                  /* Otras tiendas: Botones duales */
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button"
                      onClick={handleAdd}
                      className="flex-1 px-8 py-5 bg-black text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.25em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-98"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Añadir al Carrito
                    </button>
                    <button 
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 px-8 py-5 border-2 border-black text-black rounded-2xl font-bold uppercase text-[10px] tracking-[0.25em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-98"
                    >
                      <Zap className="w-4 h-4" />
                      {isReservation ? 'Pagar Reserva Ya' : 'Comprar Ya'}
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-6 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Envío Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Garantía Thalix</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
