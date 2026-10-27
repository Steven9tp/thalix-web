import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, Filter, ChevronRight, Check } from "lucide-react";
import { View } from "../types";

interface ShopLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  setCurrentView: (view: View) => void;
  category: string;
  topContent?: React.ReactNode;
  headerImages?: string[];
}

export const ShopLayout = ({ 
  title, 
  subtitle, 
  children, 
  setCurrentView, 
  category, 
  topContent, 
  headerImages 
}: ShopLayoutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Todos los Productos");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  React.useEffect(() => {
    if (!headerImages || headerImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % headerImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [headerImages]);

  const activeImage = headerImages && headerImages.length > 0 ? headerImages[activeIndex] : null;

  const filterOptions = [
    { name: 'Todos los Productos', count: 12 },
    { name: 'Novedades 2026', count: 4 },
    { name: 'Más Vendidos', count: 8 },
    { name: 'Edición Limitada', count: 3 },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-24 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        
        {/* Header Hero Section */}
        <div className="relative min-h-[220px] md:h-[300px] rounded-[2.5rem] overflow-hidden mb-10 bg-black shadow-xl border border-zinc-800">
          {/* Dynamic Background Image Slider */}
          {activeImage && (
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={activeImage}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  alt={`${title} theme`}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              {/* Fade gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
            </div>
          )}

          <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-center">
            <button 
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 md:mb-6 group w-fit cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Volver al Inicio</span>
            </button>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white mb-2 leading-none break-words">
              {title}
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm uppercase tracking-[0.3em] font-extrabold">
              {subtitle}
            </p>
          </div>

          <div className="absolute right-6 top-0 h-full flex items-center justify-center opacity-10 pointer-events-none z-10 select-none">
            <div className="text-[100px] md:text-[180px] font-display font-black text-white uppercase tracking-tighter whitespace-nowrap">
              {category}
            </div>
          </div>
        </div>

        {/* Top Content (e.g. Personalized Section when present) */}
        {topContent}

        {/* Search & Quick Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder={`Buscar en catálogo Thalix ${title}...`} 
              className="w-full bg-white border border-zinc-200/80 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all shadow-sm text-black placeholder:text-zinc-400"
            />
          </div>
          <button className="bg-black text-white hover:bg-zinc-800 px-8 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.25em] transition-all shadow-md active:scale-95 cursor-pointer">
            Filtrar Catálogo
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pb-20">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-[2rem] border border-zinc-200/80 shadow-sm">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-black mb-5 flex items-center gap-2">
                Filtros de Colección
              </h3>
              <nav className="space-y-2">
                {filterOptions.map((item) => {
                  const isActive = selectedFilter === item.name;
                  return (
                    <button 
                      key={item.name}
                      onClick={() => setSelectedFilter(item.name)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-black border border-zinc-200/50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-mono ${isActive ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200/70 text-zinc-600'}`}>
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Newsletter VIP Box */}
            <div className="p-6 bg-black rounded-[2rem] text-white space-y-4 shadow-xl border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl pointer-events-none" />
              
              <h4 className="text-base font-display font-bold uppercase tracking-tight text-white leading-tight">
                Nuevos Lanzamientos
              </h4>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                Recibe acceso prioritario a drops exclusivos y piezas de autor limitadas.
              </p>

              <form onSubmit={handleSubscribe} className="relative pt-1">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="tu@email.com" 
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-4 pr-10 text-xs outline-none focus:border-white text-white placeholder:text-zinc-500"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-zinc-200 p-1.5 rounded-lg transition-colors cursor-pointer"
                  aria-label="Suscribirse"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {newsletterSubscribed && (
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-wider animate-fadeIn">
                  <Check className="w-3.5 h-3.5" /> ¡Suscripción confirmada!
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {children}
            
            {/* Pagination */}
            <div className="mt-16 flex items-center justify-center gap-2">
               <button className="px-4 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black hover:border-black transition-all cursor-pointer">
                 Anterior
               </button>
               {[1, 2, 3].map(n => (
                 <button 
                   key={n} 
                   className={`w-11 h-11 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                     n === 1 
                       ? 'bg-black text-white shadow-md' 
                       : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400'
                   }`}
                 >
                   {n}
                 </button>
               ))}
               <button className="px-4 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black hover:border-black transition-all cursor-pointer">
                 Siguiente
               </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
