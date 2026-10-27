import React from "react";
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { View } from "../types";

interface FooterProps {
  setCurrentView: (view: View) => void;
}

export const Footer = ({ setCurrentView }: FooterProps) => {
  const handleNavClick = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-20 px-6 md:px-16 lg:px-20 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Subtle monochrome ambient light */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-white/[0.02] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center">
            <Logo className="h-8 md:h-9 w-auto text-white" />
          </div>
          <p className="text-zinc-400 text-sm font-normal max-w-sm leading-relaxed">
            Fusionando diseño textil, artesanía de precisión en madera MDF, arquitectura de software y metaversos digitales en un solo ecosistema integrado.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-white transition-all border border-zinc-800"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-white transition-all border border-zinc-800"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-white transition-all border border-zinc-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="md:col-span-3 space-y-5">
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-zinc-400">
            Líneas de Diseño
          </h4>
          <div className="flex flex-col gap-3">
            {[
              { view: 'fashion' as View, label: 'Moda Digital & Streetwear' },
              { view: 'mdf' as View, label: 'Artesanía MDF & Corte Láser' },
              { view: 'systems' as View, label: 'Software & Dashboards' },
              { view: 'gaming' as View, label: 'Gaming & Assets 3D' },
              { view: 'personalized' as View, label: 'Diseño Personalizado' },
              { view: 'contact' as View, label: 'Formulario de Contactos' },
              { view: 'about' as View, label: 'Nosotros / Manifiesto' }
            ].map((item) => (
              <button 
                key={item.view} 
                onClick={() => handleNavClick(item.view)}
                className="text-xs text-zinc-300 hover:text-white transition-colors text-left font-medium flex items-center justify-between group py-1 cursor-pointer"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact & Studio Location */}
        <div className="md:col-span-4 space-y-5">
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-zinc-400">
            Estudio Central
          </h4>
          <div className="space-y-3 text-xs text-zinc-300">
            <button 
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer text-left"
            >
              <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>steven2001cesar@gmail.com</span>
            </button>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>+593 99 999 9999</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Ambato — Ecuador</span>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white block">
              Garantía de Calidad Thalix
            </span>
            <p className="text-[11px] text-zinc-400">
              Todos nuestros productos físicos y digitales cuentan con certificación de autor y soporte continuo.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium text-center md:text-left">
          © 2026 Thalix Creative Hub. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          <button onClick={() => handleNavClick('about')} className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors cursor-pointer">
            Privacidad
          </button>
          <button onClick={() => handleNavClick('about')} className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors cursor-pointer">
            Términos
          </button>
        </div>
      </div>
    </footer>
  );
};
