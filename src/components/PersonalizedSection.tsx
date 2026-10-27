import React from "react";
import { motion } from "motion/react";
import { MessageCircle, Box, Zap, MousePointer2, Sparkles, ArrowRight } from "lucide-react";

interface PersonalizedSectionProps {
  onExplore: () => void;
}

export const PersonalizedSection = ({ onExplore }: PersonalizedSectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-black text-white p-8 md:p-12 shadow-2xl mb-10 min-h-[500px] flex items-center group/section border border-zinc-800">
      {/* Background Premium 2D Gradient & Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-cover bg-center mix-blend-overlay scale-105 group-hover/section:scale-110 transition-transform duration-[4000ms]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200')" }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.06),transparent)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-white border border-zinc-800"
            >
              <Sparkles className="w-3 h-3 text-white animate-pulse" /> Servicio Premium
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
              Diseño <br /> <span className="text-zinc-500">Personalizado</span>
            </h2>
          </div>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-md">
            Llevamos tus ideas a la realidad con tecnología CNC y láser de alta precisión. Creamos piezas únicas que cuentan tu historia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onExplore}
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-zinc-200 hover:scale-105 transition-all shadow-2xl cursor-pointer"
            >
              <span>Ver Galería</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>

            <a 
              href="https://wa.me/593987654321" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-transparent text-white rounded-full font-bold uppercase text-[10px] tracking-[0.4em] border-2 border-[#25D366] hover:bg-[#25D366] transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" /> 
              <span>Consultar WhatsApp</span>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative hidden lg:block"
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1581447100595-3773d52d302f?auto=format&fit=crop&q=80&w=400"
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 ${i === 1 ? 'translate-y-8' : ''}`}
              >
                <img src={img} alt={`MDF ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
