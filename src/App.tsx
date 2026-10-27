import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  QrCode, 
  Phone, 
  CheckCircle2,
  ShoppingCart,
  Loader2
} from "lucide-react";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { PayPalButton } from "./components/PayPalButton";

// Views
import { LandingView } from "./views/LandingView";
import { FashionShopView } from "./views/FashionShopView";
import { MDFShopView } from "./views/MDFShopView";
import { SystemsShopView } from "./views/SystemsShopView";
import { GamingShopView } from "./views/GamingShopView";
import { AboutView } from "./views/AboutView";
import { ProfileView } from "./views/ProfileView";
import { ContactView } from "./views/ContactView";
import { PersonalizedGalleryView } from "./components/PersonalizedGalleryView";

// Types & Constants
import { View, Product, CartItem, User, Order } from "./types";
import { BANK_INFO, STORE_INFO } from "./constants";
import { fetchWooCommerceProducts, getFallbackProducts, createWooCommerceOrder } from "./services/woocommerce";

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [productsData, setProductsData] = useState(getFallbackProducts());
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'deuna' | 'paypal'>('deuna');
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [orderComplete, setOrderComplete] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [isLoadingQr, setIsLoadingQr] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('thalix_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes('@')) {
      setAuthError('Por favor ingresa un correo electrónico válido');
      return;
    }
    if (authMode === 'register' && !authName.trim()) {
      setAuthError('Por favor ingresa tu nombre');
      return;
    }

    const displayName = authName.trim() || authEmail.split('@')[0];
    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: displayName,
      email: authEmail.trim(),
      totalSpent: 0,
      purchaseHistory: []
    };

    setUser(loggedUser);
    try {
      localStorage.setItem('thalix_user', JSON.stringify(loggedUser));
    } catch (err) {
      console.error('Error saving user to storage:', err);
    }

    setAuthEmail('');
    setAuthName('');
    setAuthError('');
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('thalix_user');
    } catch (err) {}
    setCurrentView('landing');
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadWooCommerce() {
      try {
        setIsLoadingProducts(true);
        const data = await fetchWooCommerceProducts();
        if (isMounted) {
          setProductsData(data);
        }
      } catch (err) {
        console.error("Error al cargar productos de WooCommerce:", err);
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    }
    loadWooCommerce();
    return () => { isMounted = false; };
  }, []);

  const handleCheckout = async () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
    setIsLoadingQr(true);
    
    try {
      const response = await fetch('/api/payments/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: finalTotal, 
          orderId: `THX-${Math.random().toString(36).substr(2, 9).toUpperCase()}` 
        })
      });
      const data = await response.json();
      setQrData(data.qrData);
    } catch (error) {
      console.error("Error generating QR:", error);
    } finally {
      setIsLoadingQr(false);
    }
  };

  // Expose methods for views/modals
  useEffect(() => {
    (window as any).setIsAuthOpen = setIsAuthOpen;
    (window as any).handleCheckout = handleCheckout;
  }, [handleCheckout]);

  const addToCart = (
    product: Product, 
    options?: { 
      option?: string; 
      selectedSize?: string;
      selectedColor?: string;
      plan?: string; 
      isReservation?: boolean; 
      reservationAmount?: number 
    }
  ) => {
    setCart(prev => {
      const itemKey = `${product.id}-${options?.selectedSize || ''}-${options?.selectedColor || ''}-${options?.option || ''}-${options?.plan || ''}-${options?.isReservation ? 'res' : 'full'}`;
      const existingIndex = prev.findIndex(item => 
        (item.cartItemId === itemKey) || 
        (
          item.id === product.id && 
          item.selectedSize === options?.selectedSize &&
          item.selectedColor === options?.selectedColor &&
          item.selectedOption === options?.option && 
          item.selectedPlan === options?.plan &&
          item.isReservation === options?.isReservation
        )
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) => 
          idx === existingIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      return [...prev, { 
        ...product, 
        cartItemId: itemKey,
        quantity: 1, 
        selectedOption: options?.option, 
        selectedSize: options?.selectedSize,
        selectedColor: options?.selectedColor,
        selectedPlan: options?.plan,
        isReservation: options?.isReservation,
        reservationAmount: options?.reservationAmount
      }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const buyNow = (
    product: Product, 
    options?: { 
      option?: string; 
      selectedSize?: string;
      selectedColor?: string;
      plan?: string; 
      isReservation?: boolean; 
      reservationAmount?: number 
    }
  ) => {
    const itemKey = `${product.id}-${options?.selectedSize || ''}-${options?.selectedColor || ''}-${options?.option || ''}-${options?.plan || ''}-${options?.isReservation ? 'res' : 'full'}`;
    setCart([{ 
      ...product, 
      cartItemId: itemKey,
      quantity: 1,
      selectedOption: options?.option,
      selectedSize: options?.selectedSize,
      selectedColor: options?.selectedColor,
      selectedPlan: options?.plan,
      isReservation: options?.isReservation,
      reservationAmount: options?.reservationAmount
    }]);
    handleCheckout();
  };

  const removeFromCart = (idOrKey: string) => {
    setCart(prev => prev.filter(item => (item.cartItemId || item.id) !== idOrKey));
  };

  const updateQuantity = (idOrKey: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if ((item.cartItemId || item.id) === idOrKey) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => {
    if (item.isReservation && item.reservationAmount) {
      return sum + item.reservationAmount * item.quantity;
    }
    let price = item.price;
    if (item.selectedPlan && item.plans) {
      const plan = item.plans.find(p => p.name === item.selectedPlan);
      if (plan) price = plan.price;
    }
    return sum + price * item.quantity;
  }, 0);

  const finalTotal = cartTotal + (shippingMethod === 'delivery' ? STORE_INFO.shippingCost : 0);

  const [isProcessing, setIsProcessing] = useState(false);

  const completeOrder = async () => {
    setIsProcessing(true);
    const orderId = `THX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    try {
      // Create order in WordPress WooCommerce
      await createWooCommerceOrder({
        customer: user ? { name: user.name, email: user.email } : { name: 'Cliente Invitado', email: 'invitado@proyectoxg2.site' },
        items: cart,
        shippingMethod: shippingMethod,
        shippingCost: shippingMethod === 'delivery' ? STORE_INFO.shippingCost : 0,
        total: finalTotal,
        paymentMethodTitle: 'Deuna! / Banco Pichincha QR'
      });
    } catch (e) {
      console.error("Error sincronizando orden con WooCommerce:", e);
    }

    // Update user stats
    if (user) {
      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString(),
        total: finalTotal,
        items: cart.map(item => item.name),
        status: 'completed',
        shippingMethod: shippingMethod,
        isReservation: cart.some(item => item.isReservation),
        reservationAmount: cart.reduce((sum, item) => sum + (item.reservationAmount || 0) * item.quantity, 0)
      };
      const updatedUser: User = {
        ...user,
        totalSpent: user.totalSpent + finalTotal,
        purchaseHistory: [newOrder, ...user.purchaseHistory]
      };
      setUser(updatedUser);
      try {
        localStorage.setItem('thalix_user', JSON.stringify(updatedUser));
      } catch (e) {}
    }

    setOrderComplete(true);
    setIsCheckoutOpen(false);
    setIsProcessing(false);
    setCart([]);
    setQrData(null);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#000000', '#a1a1aa']
    });
  };

  const handlePayPalSuccess = async (details: any) => {
    setIsProcessing(true);
    const orderId = `PP-${details.id || Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const payerName = [details.payer?.name?.given_name, details.payer?.name?.surname].filter(Boolean).join(' ') || (user ? user.name : 'Cliente PayPal');
    const payerEmail = details.payer?.email_address || (user ? user.email : 'cliente@proyectoxg2.site');

    try {
      await createWooCommerceOrder({
        customer: { name: payerName, email: payerEmail },
        items: cart,
        shippingMethod: shippingMethod,
        shippingCost: shippingMethod === 'delivery' ? STORE_INFO.shippingCost : 0,
        total: finalTotal,
        paymentMethodTitle: 'PayPal / Tarjeta de Crédito o Débito'
      });
    } catch (e) {
      console.error("Error sincronizando orden de PayPal con WooCommerce:", e);
    }

    if (user) {
      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString(),
        total: finalTotal,
        items: cart.map(item => item.name),
        status: 'completed',
        shippingMethod: shippingMethod,
        isReservation: cart.some(item => item.isReservation),
        reservationAmount: cart.reduce((sum, item) => sum + (item.reservationAmount || 0) * item.quantity, 0)
      };
      const updatedUser: User = {
        ...user,
        totalSpent: user.totalSpent + finalTotal,
        purchaseHistory: [newOrder, ...user.purchaseHistory]
      };
      setUser(updatedUser);
      try {
        localStorage.setItem('thalix_user', JSON.stringify(updatedUser));
      } catch (e) {}
    }

    setOrderComplete(true);
    setIsCheckoutOpen(false);
    setIsProcessing(false);
    setCart([]);
    setQrData(null);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0079C1', '#00457C', '#ffc439', '#ffffff']
    });
  };

  return (
    <div ref={containerRef} className="relative overflow-x-hidden selection:bg-black selection:text-white transition-colors duration-500 bg-[#FAF9F6] text-black">
      
      <Navbar 
        isScrolled={isScrolled} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
        setIsAuthOpen={setIsAuthOpen}
        setCurrentView={setCurrentView}
        currentView={currentView}
      />

      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-w-full m-0 p-0">
            <LandingView setCurrentView={setCurrentView} setIsAuthOpen={setIsAuthOpen} />
          </motion.div>
        )}
        {currentView === 'fashion' && (
          <motion.div key="fashion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FashionShopView 
              setCurrentView={setCurrentView} 
              onAddToCart={addToCart} 
              onBuyNow={buyNow} 
              onViewDetail={setSelectedProduct}
              products={productsData.fashion}
            />
          </motion.div>
        )}
        {currentView === 'mdf' && (
          <motion.div key="mdf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MDFShopView 
              setCurrentView={setCurrentView} 
              onAddToCart={addToCart} 
              onBuyNow={buyNow} 
              onViewDetail={setSelectedProduct}
              products={productsData.mdf}
            />
          </motion.div>
        )}
        {currentView === 'systems' && (
          <motion.div key="systems" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SystemsShopView 
              setCurrentView={setCurrentView} 
              onAddToCart={addToCart} 
              onBuyNow={buyNow} 
              onViewDetail={setSelectedProduct}
              products={productsData.systems}
            />
          </motion.div>
        )}
        {currentView === 'gaming' && (
          <motion.div key="gaming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GamingShopView 
              setCurrentView={setCurrentView} 
              onAddToCart={addToCart} 
              onBuyNow={buyNow} 
              onViewDetail={setSelectedProduct}
              products={productsData.gaming}
            />
          </motion.div>
        )}
        {currentView === 'personalized' && (
          <motion.div key="personalized" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PersonalizedGalleryView onBack={() => setCurrentView('landing')} />
          </motion.div>
        )}
        {currentView === 'about' && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AboutView />
          </motion.div>
        )}
        {currentView === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContactView />
          </motion.div>
        )}
        {currentView === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfileView user={user} setCurrentView={setCurrentView} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer setCurrentView={setCurrentView} />

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onBuyNow={buyNow}
      />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[101] p-8 flex flex-col shadow-2xl border-l border-black/5">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-display font-bold uppercase tracking-tighter text-black">Tu Carrito</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors text-black"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-black space-y-4">
                    <ShoppingCart className="w-12 h-12 opacity-20" />
                    <p className="uppercase tracking-widest text-xs font-bold">Carrito vacío</p>
                  </div>
                ) : (
                  cart.map(item => {
                    const cartKey = item.cartItemId || item.id;
                    return (
                      <div key={cartKey} className="flex gap-4 group p-3 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 p-1.5 border border-zinc-200/60">
                          <img src={item.image} className="w-full h-full object-contain transition-all" alt={item.name} referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-xs uppercase tracking-tight text-black line-clamp-1">{item.name}</h3>
                            <button 
                              type="button"
                              onClick={() => removeFromCart(cartKey)} 
                              className="text-zinc-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex flex-col gap-1 mb-2">
                            <p className="text-xs font-extrabold text-black">
                              {item.isReservation ? (
                                <span className="text-emerald-600 font-bold">Reserva: ${item.reservationAmount}</span>
                              ) : (
                                `$${item.price}`
                              )}
                            </p>

                            {/* Fashion Size & Color tags */}
                            {item.selectedSize && item.selectedColor && (
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                <span className="px-2 py-0.5 bg-black text-white text-[8px] font-extrabold uppercase tracking-wider rounded">
                                  Talla {item.selectedSize}
                                </span>
                                <span className="px-2 py-0.5 bg-white border border-zinc-200 text-zinc-800 text-[8px] font-bold uppercase tracking-wider rounded">
                                  {item.selectedColor}
                                </span>
                              </div>
                            )}

                            {item.selectedOption && !item.selectedSize && (
                              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Opción: {item.selectedOption}</span>
                            )}
                            {item.selectedPlan && (
                              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Plan: {item.selectedPlan}</span>
                            )}
                            {item.isReservation && (
                              <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-600 italic">Bajo Pedido (5-15 días)</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-4 pt-1 border-t border-zinc-200/50">
                            <div className="flex items-center border border-zinc-300 bg-white rounded-lg px-2 py-0.5 gap-2.5">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(cartKey, -1)} 
                                className="text-zinc-500 hover:text-black cursor-pointer p-0.5"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-mono font-bold w-4 text-center text-black">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(cartKey, 1)} 
                                className="text-zinc-500 hover:text-black cursor-pointer p-0.5"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                            <span className="text-xs font-bold text-black ml-auto">
                              ${((item.isReservation ? item.reservationAmount : (item.selectedPlan && item.plans ? (item.plans.find(p => p.name === item.selectedPlan)?.price || item.price) : item.price))! * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-12 pt-8 border-t border-black/10 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Método de Entrega</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setShippingMethod('pickup')}
                        className={`py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${shippingMethod === 'pickup' ? 'border-black bg-black text-white' : 'border-black/10 text-black hover:border-black/40'}`}
                      >
                        Retiro en Tienda
                      </button>
                      <button 
                        onClick={() => setShippingMethod('delivery')}
                        className={`py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${shippingMethod === 'delivery' ? 'border-black bg-black text-white' : 'border-black/10 text-black hover:border-black/40'}`}
                      >
                        Envío a Domicilio
                      </button>
                    </div>
                    {shippingMethod === 'pickup' && (
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 space-y-1">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-black/40">Dirección de Retiro</p>
                        <p className="text-[10px] text-black font-bold uppercase tracking-tight leading-relaxed">
                          {STORE_INFO.address}
                        </p>
                        <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest mt-1">
                          Disponible inmediatamente
                        </p>
                      </div>
                    )}
                    {shippingMethod === 'delivery' && (
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5 space-y-1">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-black/40">Información de Envío</p>
                        <p className="text-[10px] text-black font-bold uppercase tracking-tight leading-relaxed">
                          Costo: ${STORE_INFO.shippingCost.toFixed(2)}
                        </p>
                        <p className="text-[8px] text-amber-600 font-bold uppercase tracking-widest mt-1">
                          Tiempo estimado: 2-5 días laborables (Sujeto a ubicación)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-black font-bold">Total</span>
                      {shippingMethod === 'delivery' && (
                        <span className="text-[8px] text-black/40 uppercase tracking-widest">Incluye envío</span>
                      )}
                    </div>
                    <span className="text-4xl font-display font-bold tracking-tighter text-black">${finalTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full py-5 bg-black text-white rounded-full font-bold uppercase text-xs tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95">Finalizar Compra</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCheckoutOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 border border-black/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black/5 via-black/20 to-black/5" />
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-display font-bold uppercase tracking-tighter text-black">Pago Seguro</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors text-black"><X /></button>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black">Método de Pago</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setPaymentMethod('deuna')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'deuna' ? 'border-black bg-black/5 font-bold shadow-sm' : 'border-black/10 hover:border-black/30'}`}
                      >
                        <QrCode className="w-6 h-6 text-black" />
                        <div className="text-center">
                          <span className="text-[9px] uppercase font-bold tracking-wider block text-black">Deuna / Pichincha</span>
                          <span className="text-[10px] text-black/60 font-medium">Código QR</span>
                        </div>
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-black bg-black/5 font-bold shadow-sm' : 'border-black/10 hover:border-black/30'}`}
                      >
                        <CreditCard className="w-6 h-6 text-black" />
                        <div className="text-center">
                          <span className="text-[9px] uppercase font-bold tracking-wider block text-black">PayPal & Tarjetas</span>
                          <span className="text-[10px] text-black/60 font-medium">Débito / Crédito</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 rounded-3xl border border-black/5 min-h-[300px]">
                    {paymentMethod === 'paypal' ? (
                      <PayPalButton 
                        amount={finalTotal}
                        onSuccess={handlePayPalSuccess}
                        onError={(err) => console.error("PayPal Error:", err)}
                      />
                    ) : (
                      isProcessing ? (
                        <div className="flex flex-col items-center gap-4 py-8">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="w-12 h-12 text-black" />
                          </motion.div>
                          <p className="text-[10px] uppercase font-bold tracking-[0.3em] animate-pulse text-black">Procesando Pago...</p>
                          <p className="text-[8px] text-black/40 uppercase tracking-widest">Verificando con Deuna!</p>
                        </div>
                      ) : isLoadingQr ? (
                        <div className="flex flex-col items-center gap-4 py-8">
                          <Loader2 className="w-8 h-8 animate-spin text-black" />
                          <p className="text-[10px] uppercase font-bold tracking-widest text-black">Generando QR...</p>
                        </div>
                      ) : qrData ? (
                        <div className="space-y-6 text-center">
                          <div className="bg-white p-4 rounded-2xl shadow-sm inline-block border border-black/5">
                            <QRCodeSVG value={qrData} size={180} />
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-black/60">Escanea desde tu app Deuna</p>
                            <p className="text-[12px] font-bold text-black uppercase tracking-tighter">Monto: ${finalTotal.toFixed(2)}</p>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black">Resumen del Pedido</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-black/60">Subtotal</span>
                        <span className="font-mono text-black">${cartTotal.toFixed(2)}</span>
                      </div>
                      {cart.some(item => item.isReservation) && (
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 p-2 rounded-lg">
                          <span>Pago de Reserva</span>
                          <span>{STORE_INFO.reservationPercentage * 100}% del total</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-black/60">Envío ({shippingMethod === 'pickup' ? 'Retiro' : 'Domicilio'})</span>
                          {shippingMethod === 'pickup' ? (
                            <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">Gratis</span>
                          ) : (
                            <span className="font-mono text-black">${STORE_INFO.shippingCost.toFixed(2)}</span>
                          )}
                        </div>
                        {shippingMethod === 'pickup' && (
                          <p className="text-[8px] text-black/40 uppercase tracking-widest text-right">
                            Retira en: {STORE_INFO.address}
                          </p>
                        )}
                        {shippingMethod === 'delivery' && (
                          <p className="text-[8px] text-amber-600/60 uppercase tracking-widest text-right">
                            Entrega en 2-5 días laborables
                          </p>
                        )}
                      </div>
                      <div className="pt-4 border-t border-black/10 flex justify-between items-end">
                        <span className="text-xs font-bold uppercase tracking-widest text-black">Total a Pagar Ahora</span>
                        <span className="text-3xl font-display font-bold tracking-tighter text-black">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-black/5 border border-black/10 space-y-4">
                    <div className="flex items-center gap-3 text-black">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Soporte Directo</span>
                    </div>
                    <p className="text-xs text-black/60 leading-relaxed">
                      {paymentMethod === 'paypal' 
                        ? 'Tu pago es procesado con cifrado bancario seguro a través de la pasarela oficial de PayPal.' 
                        : 'Una vez realizado el pago vía QR, el sistema detectará la transacción automáticamente y procesará tu envío.'}
                    </p>
                  </div>

                  {paymentMethod === 'deuna' ? (
                    <button onClick={completeOrder} className="w-full py-5 bg-black text-white rounded-full font-bold uppercase text-xs tracking-[0.3em] hover:bg-zinc-800 transition-all cursor-pointer shadow-md active:scale-95">
                      He realizado el pago
                    </button>
                  ) : (
                    <p className="text-center text-[10px] uppercase tracking-widest font-bold text-black/50">
                      Completa el pago usando los botones de PayPal / Tarjeta arriba
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Success Modal */}
      <AnimatePresence>
        {orderComplete && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/95 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative w-full max-w-md text-center space-y-8">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-12">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl font-display font-bold uppercase tracking-tighter text-black">¡Pago Confirmado!</h2>
              <p className="text-black leading-relaxed">Tu pedido ha sido procesado con éxito. Recibirás una notificación en tu WhatsApp con el número de guía. ¡Gracias por elegir Thalix!</p>
              <button onClick={() => setOrderComplete(false)} className="px-12 py-5 border border-black/20 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-black/10 transition-all text-black">Cerrar</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAuthOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full max-w-md bg-white rounded-[3rem] p-10 border border-black/10 text-center shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 p-1 bg-zinc-100 rounded-full">
                  <button 
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${authMode === 'login' ? 'bg-black text-white shadow-sm' : 'text-black/60 hover:text-black'}`}
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${authMode === 'register' ? 'bg-black text-white shadow-sm' : 'text-black/60 hover:text-black'}`}
                  >
                    Registrarse
                  </button>
                </div>
                <button onClick={() => setIsAuthOpen(false)} className="p-2 hover:bg-black/5 rounded-full text-black/40 hover:text-black transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-2 text-black">
                {authMode === 'login' ? 'Bienvenido de Nuevo' : 'Crear Cuenta'}
              </h2>
              <p className="text-black/40 mb-8 text-xs uppercase tracking-widest font-medium">
                {authMode === 'login' ? 'Accede a tus pedidos y recompensas' : 'Únete al ecosistema Thalix'}
              </p>
              
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <input 
                      type="text" 
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="NOMBRE COMPLETO" 
                      className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-black/40 focus:bg-white outline-none transition-all text-black"
                    />
                  </div>
                )}

                <div>
                  <input 
                    type="email" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="CORREO ELECTRÓNICO" 
                    className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:border-black/40 focus:bg-white outline-none transition-all text-black"
                    required
                  />
                </div>

                {authError && (
                  <p className="text-xs text-red-500 font-medium">{authError}</p>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  {authMode === 'login' ? 'Ingresar a mi Cuenta' : 'Registrarme'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
