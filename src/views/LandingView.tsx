import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Layers,
  Sparkles,
  CheckCircle2,
  Box,
  Sliders
} from "lucide-react";
import { Interactive3DSphere } from "../components/Interactive3DSphere";
import { PersonalizedSection } from "../components/PersonalizedSection";
import { View } from "../types";

interface LandingViewProps {
  setCurrentView: (view: View) => void;
  setIsAuthOpen: (open: boolean) => void;
}

export const LandingView = ({ setCurrentView }: LandingViewProps) => {
  const [lookIndex, setLookIndex] = useState(0);

  const lookbook = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      tag: "ESTÉTICA DE VANGUARDIA",
      title: "COLECCIÓN NOIR",
      desc: "Nuestros diseños minimalistas de corte urbano redefinen la silueta contemporánea con tejidos termoregulados."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200",
      tag: "TEXTILES INTELIGENTES",
      title: "TECH-MINIMAL",
      desc: "Prendas funcionales diseñadas con costuras termoselladas y resistencia al agua de grado industrial."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1200",
      tag: "URBANO SOSTENIBLE",
      title: "CYBER-SHELL",
      desc: "Tejidos inteligentes y corte ergonómico que protegen sin comprometer la ligereza ni la elegancia."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-black w-full overflow-x-hidden pb-20">
      
      {/* 1. FULL SCREEN 3D IMMERSIVE HERO: Distorted Interactive 3D Sphere */}
      <section className="w-full mb-16">
        <Interactive3DSphere 
          onExplore={() => {
            const el = document.getElementById('fashion-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* 2. FASHION SPOTLIGHT (Matching Store Colors) */}
      <section id="fashion-section" className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-20 pt-8">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 border border-zinc-200/80 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-extrabold block">
                  THALIX FASHION HOUSE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-black leading-none">
                  Moda <br /> <span className="text-zinc-500 font-light">Digital</span>
                </h2>
              </div>
              
              <div className="space-y-4 max-w-lg">
                <p className="text-lg font-light text-zinc-800 leading-relaxed">
                  Prendas de alta costura contemporánea diseñadas con textiles termorregulados y corte ergonómico de precisión.
                </p>
                <p className="text-zinc-600 font-normal leading-relaxed text-sm">
                  Cada pieza está concebida para adaptarse a escenarios de vanguardia y a la vida urbana diaria, combinando sostenibilidad con durabilidad premium.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      setCurrentView('fashion');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.25em] hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Ver Colección Completa <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] md:aspect-square group rounded-[2rem] overflow-hidden bg-zinc-900 shadow-xl border border-zinc-800"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lookIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  src={lookbook[lookIndex].image}
                  className="w-full h-full object-cover"
                  alt={lookbook[lookIndex].title}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Lookbook Nav Controls */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-30">
                <button
                  type="button"
                  onClick={() => setLookIndex((prev) => (prev === 0 ? lookbook.length - 1 : prev - 1))}
                  className="p-3 bg-black/80 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-black transition-all shadow-md active:scale-90 border border-zinc-700 cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLookIndex((prev) => (prev === lookbook.length - 1 ? 0 : prev + 1))}
                  className="p-3 bg-black/80 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-black transition-all shadow-md active:scale-90 border border-zinc-700 cursor-pointer"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Info Badge */}
              <div className="absolute top-6 left-6 bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-full z-20 border border-zinc-700 text-white">
                <span className="text-[9px] uppercase font-mono tracking-[0.2em]">
                  Look {lookIndex + 1} de {lookbook.length}
                </span>
              </div>

              {/* Floating style label */}
              <div className="absolute bottom-6 left-6 right-24 z-20 text-white pointer-events-none">
                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-1 block">
                  {lookbook[lookIndex].tag}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight leading-none mb-1 text-white">
                  {lookbook[lookIndex].title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  {lookbook[lookIndex].desc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CRAFT & MDF SECTION (Clean Store Colors) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 border border-zinc-200/80 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Description & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-2 md:order-1"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-extrabold block">
                  THALIX WOOD & DESIGN
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-black leading-none">
                  Artesanía <br /> <span className="text-zinc-500 font-light">Modular</span>
                </h2>
              </div>
              
              <div className="space-y-4 max-w-lg">
                <p className="text-lg font-light text-zinc-800 leading-relaxed">
                  Lámparas esculturales, cuadros geométricos multicapa y accesorios modulares elaborados en madera MDF de alta densidad.
                </p>
                <p className="text-zinc-600 leading-relaxed text-sm">
                  Fusionamos el corte láser micronizado de precisión con acabados satinados al óleo y ensambles limpios sin tornillería visible.
                </p>

                {/* Micro Features Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    <Box className="w-5 h-5 text-black mb-2" />
                    <h5 className="text-xs font-bold uppercase text-black">MDF Seleccionado</h5>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Espesores de 3mm a 15mm con corte pulido</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    <Sliders className="w-5 h-5 text-black mb-2" />
                    <h5 className="text-xs font-bold uppercase text-black">Personalizable</h5>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Grabado vectorial y medidas a medida</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setCurrentView('mdf');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-black text-white hover:bg-zinc-800 transition-all rounded-2xl font-bold uppercase text-[10px] tracking-[0.25em] shadow-md active:scale-95 cursor-pointer"
                  >
                    Explorar Catálogo MDF <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] md:aspect-square rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-xl order-1 md:order-2 overflow-hidden group/craftshow"
            >
              <img 
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-90 group-hover/craftshow:scale-105 transition-transform duration-700" 
                alt="Artesanía MDF de Precisión" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-zinc-700 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                  Corte CNC & Láser CO2
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none p-5 rounded-2xl bg-black/85 backdrop-blur-md border border-zinc-800 text-white">
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-zinc-400 block mb-1">
                  Serie Biomórfica • Madera & Luz
                </span>
                <p className="text-xs text-white uppercase tracking-wider font-bold">
                  Geometría fractal diseñada para iluminar espacios con calidez
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. PERSONALIZED CUSTOM SERVICE (Integrated in Store Flow) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-20">
        <PersonalizedSection onExplore={() => setCurrentView('personalized')} />
      </section>

      {/* 5. SYSTEMS & CLOUD SECTION (Clean Store Colors) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 border border-zinc-200/80 shadow-sm">
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-extrabold mb-3 block">
                ENTERPRISE DIGITAL ARCHITECTURE
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-black leading-none">
                Thalix Systems
              </h2>
              <p className="text-base font-normal text-zinc-600 mt-4 max-w-2xl mx-auto leading-relaxed">
                Plataformas inteligentes, analítica en tiempo real y dashboards diseñados para empresas que lideran el mercado.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-black leading-tight">
                  Control Total de Operaciones en una Sola Pantalla.
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                  Sincronizamos inventarios físicos, producción industrial y telemetría de ventas con latencias ultra bajas y seguridad de primer nivel.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 text-xs text-zinc-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" /> Integración API REST & GraphQL sin fricciones
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" /> Dashboards analíticos en tiempo real con D3 & Recharts
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" /> Despliegue en la nube con redundancia 99.9%
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    setCurrentView('systems');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl hover:bg-zinc-800 transition-all shadow-md font-bold uppercase text-[10px] tracking-[0.25em] active:scale-95 cursor-pointer"
                >
                  <span>Ver Suite de Software</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-black transition-all shadow-sm group">
                <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-black">Dashboards Pro</span>
                <span className="text-[10px] text-zinc-500 font-mono">Control KPI en vivo</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-black transition-all shadow-sm group">
                <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-black">Inventarios Cloud</span>
                <span className="text-[10px] text-zinc-500 font-mono">Control de Stock 24/7</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. GAMING & METAVERSE SECTION (Clean Store Colors) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 border border-zinc-200/80 shadow-sm">
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-extrabold mb-3 block">
                DIGITAL ASSETS & IMMERSIVE WORLDS
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-black leading-none">
                Gaming Metaverse
              </h2>
              <p className="text-zinc-600 text-base font-normal max-w-2xl mx-auto mt-4 leading-relaxed">
                Colecciona activos virtuales verificados, skins de autor y módulos 3D para metaversos y videojuegos competitivos.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] md:aspect-square rounded-[2rem] bg-black overflow-hidden group/gameshow border border-zinc-800 shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-90 group-hover/gameshow:scale-105 transition-transform duration-700" 
                alt="Gaming Showcase" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-zinc-700 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                  Assets 3D Verificados
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-black leading-tight uppercase tracking-tight">
                  Economía Virtual Prime.
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                  Desde avatares legendarios hasta construcciones modulares optimizadas para motores Unreal Engine y Unity. Todo en un solo catálogo interoperable.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 pt-2">
                <button 
                  onClick={() => {
                    setCurrentView('gaming');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group w-full px-8 py-4 bg-black text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.25em] hover:bg-zinc-800 transition-all shadow-md flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
                >
                  Entrar al Mercado Digital <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center font-bold uppercase tracking-widest text-zinc-400">
                  Interoperabilidad con formatos FBX, OBJ & GLTF
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};
