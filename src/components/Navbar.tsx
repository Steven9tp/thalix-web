import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, User, Menu, X, Instagram, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { View } from "../types";

interface NavbarProps {
  isScrolled: boolean;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  setCurrentView: (view: View) => void;
  currentView: View;
}

export const Navbar = ({ isScrolled, cartCount, setIsCartOpen, setIsAuthOpen, setCurrentView, currentView }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', view: 'landing' as View },
    { name: 'Contactos', view: 'contact' as View },
    { name: 'Ropa', view: 'fashion' as View },
    { name: 'Artesanía', view: 'mdf' as View },
    { name: 'Sistemas', view: 'systems' as View },
    { name: 'Gaming', view: 'gaming' as View }
  ];

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-4 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm' 
        : 'py-7 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button onClick={() => handleNavClick('landing')} className="group flex items-center cursor-pointer">
            <Logo className="h-6 md:h-7 w-auto transition-transform group-hover:scale-105 text-black" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button 
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 whitespace-nowrap relative py-1 cursor-pointer ${
                  isActive 
                    ? 'text-black' 
                    : 'text-zinc-500 hover:text-black'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeLink" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hidden md:flex items-center gap-2 px-6 py-2 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Comprar {cartCount > 0 && `(${cartCount})`}
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('profile')} 
              className="p-2 text-zinc-600 hover:text-black transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden p-2 text-zinc-600 hover:text-black transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white p-12 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <Logo className="h-9 w-auto text-black" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-black cursor-pointer">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className="text-4xl font-display font-bold uppercase tracking-tighter text-left text-black hover:text-black/40 transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
            <div className="mt-auto flex gap-8">
              <Instagram className="w-6 h-6 text-black/40" />
              <Twitter className="w-6 h-6 text-black/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
