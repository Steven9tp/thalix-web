import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Disc, Database, Sparkles, Sliders, Cpu } from "lucide-react";

type Department = "fashion" | "hardware" | "software";

export const ShowcaseConsole = () => {
  const [activeDept, setActiveDept] = useState<Department>("fashion");
  
  // Custom interactive states for Fashion
  const [fashionFabric, setFashionFabric] = useState("Modulación Inteligente");
  const [fashionFit, setFashionFit] = useState("Oversized");
  const [fashionTone, setFashionTone] = useState("Negro Carbón");

  // Custom interactive states for Hardware
  const [hardwareFinish, setHardwareFinish] = useState("Roble Ahumado");
  const [hardwarePattern, setHardwarePattern] = useState("Áurea Geometría");
  const [hardwareBacklight, setHardwareBacklight] = useState(80);

  // Custom interactive states for Software
  const [softwareDb, setSoftwareDb] = useState("Cloud Firestore");
  const [softwareNode, setSoftwareNode] = useState("Estable (0.02ms)");

  const departments = [
    {
      id: "fashion" as Department,
      label: "Moda de Vanguardia",
      icon: Layers,
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-500 hover:text-amber-600",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "hardware" as Department,
      label: "Artesanía MDF",
      icon: Disc,
      color: "from-yellow-600/20 to-amber-700/10",
      accent: "text-amber-600 hover:text-amber-700",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "software" as Department,
      label: "Sistemas Software",
      icon: Database,
      color: "from-cyan-500/20 to-blue-600/10",
      accent: "text-cyan-500 hover:text-cyan-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-neutral-100 p-8 shadow-[0_32px_96px_-24px_rgba(0,0,0,0.06)] relative overflow-hidden group/console">
      {/* Subtle coordinate aids mimicking ultra-luxury physical blueprint */}
      <div className="absolute top-4 left-6 text-[8px] font-mono tracking-widest text-neutral-400 select-none">
        [ DESK_SELECTOR_CONSOLE ]
      </div>
      <div className="absolute top-4 right-6 text-[8px] font-mono tracking-widest text-neutral-400 select-none">
        SYS.REV_V2.05
      </div>

      {/* Modern, elegant tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-neutral-50/80 rounded-full border border-neutral-100/70 mb-8 mt-4">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isActive = activeDept === dept.id;
          return (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              className={`relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 py-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1] border border-neutral-100"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{dept.label}</span>
              <span className="sm:hidden">{dept.id[0].toUpperCase() + dept.id.slice(1)}</span>
            </button>
          );
        })}
      </div>

      {/* Main interactive viewport container */}
      <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-neutral-50 border border-neutral-100/80 mb-6 flex flex-col">
        <AnimatePresence mode="wait">
          {activeDept === "fashion" && (
            <motion.div
              key="fashion-viewport"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="relative h-2/3 overflow-hidden">
                <img
                  src={departments[0].image}
                  alt="Thalix Fashion"
                  className="w-full h-full object-cover group-hover/console:scale-105 transition-transform duration-[4000ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                {/* Embedded live Spec Panel */}
                <div className="absolute bottom-4 left-6 text-white text-left">
                  <span className="text-[8px] font-mono tracking-widest text-amber-400 uppercase font-black">
                    ESTÉTICA SELECCIONADA
                  </span>
                  <Heading className="text-lg font-display uppercase font-bold tracking-tight">
                    {fashionFabric}
                  </Heading>
                </div>
              </div>

              {/* Dynamic parameters adjuster (Fashion interaction) */}
              <div className="p-6 flex-1 bg-white flex flex-col justify-center space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-400">
                    Modificación de textiles y siluetas
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-mono uppercase text-neutral-400">Tejido</label>
                    <div className="flex flex-col gap-1">
                      {["Modulación Inteligente", "Hilado Grafeno"].map((fabric) => (
                        <button
                          key={fabric}
                          onClick={() => setFashionFabric(fabric)}
                          className={`text-[9px] py-1 px-2.5 rounded-md border text-left font-medium transition-all ${
                            fashionFabric === fabric
                              ? "bg-neutral-900 border-neutral-900 text-white"
                              : "border-neutral-100 hover:border-neutral-300 text-neutral-600 bg-neutral-50/50"
                          }`}
                        >
                          {fabric}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-mono uppercase text-neutral-400">Corte</label>
                    <div className="flex flex-col gap-1">
                      {["Oversized", "Ergonómico Slim"].map((fit) => (
                        <button
                          key={fit}
                          onClick={() => setFashionFit(fit)}
                          className={`text-[9px] py-1 px-2.5 rounded-md border text-left font-medium transition-all ${
                            fashionFit === fit
                              ? "bg-neutral-900 border-neutral-900 text-white"
                              : "border-neutral-100 hover:border-neutral-300 text-neutral-600 bg-neutral-50/50"
                          }`}
                        >
                          {fit}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-mono uppercase text-neutral-400">Paleta</label>
                    <div className="flex flex-col gap-1">
                      {["Negro Carbón", "Gris Cromo"].map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setFashionTone(tone)}
                          className={`text-[9px] py-1 px-2.5 rounded-md border text-left font-medium transition-all ${
                            fashionTone === tone
                              ? "bg-neutral-900 border-neutral-900 text-white"
                              : "border-neutral-100 hover:border-neutral-300 text-neutral-600 bg-neutral-50/50"
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeDept === "hardware" && (
            <motion.div
              key="hardware-viewport"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="relative h-2/3 overflow-hidden">
                <img
                  src={departments[1].image}
                  alt="Thalix Wood Manufacturing"
                  className="w-full h-full object-cover group-hover/console:scale-105 transition-transform duration-[4000ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulate LED backlight glow behind frame based on state */}
                <div 
                  className="absolute inset-0 bg-amber-500/20 mix-blend-color-dodge transition-opacity duration-300" 
                  style={{ opacity: hardwareBacklight / 100 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-6 text-white text-left">
                  <span className="text-[8px] font-mono tracking-widest text-yellow-400 uppercase font-black">
                    Ebanistería Láser
                  </span>
                  <Heading className="text-lg font-display uppercase font-bold tracking-tight">
                    {hardwareFinish} / {hardwarePattern}
                  </Heading>
                </div>
              </div>

              {/* Dynamic parameters adjuster (MDF interaction) */}
              <div className="p-6 flex-1 bg-white flex flex-col justify-center space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-400">
                    Control de ensambles y retroiluminación
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-mono uppercase text-neutral-400">Tipo de MDF</label>
                    <select
                      value={hardwareFinish}
                      onChange={(e) => setHardwareFinish(e.target.value)}
                      className="w-full text-[11px] font-semibold py-1.5 px-3 rounded-md border border-neutral-200 bg-white text-neutral-800 outline-none"
                    >
                      <option value="Roble Ahumado">Roble Ahumado Premium</option>
                      <option value="Cedro Arenado">Cedro Arenado</option>
                      <option value="Nogal Minimal">Nogal Rústico</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-mono uppercase text-neutral-400">Diseño Vectorial</label>
                    <select
                      value={hardwarePattern}
                      onChange={(e) => setHardwarePattern(e.target.value)}
                      className="w-full text-[11px] font-semibold py-1.5 px-3 rounded-md border border-neutral-200 bg-white text-neutral-800 outline-none"
                    >
                      <option value="Áurea Geometría">Áurea Geometría (Fi)</option>
                      <option value="Fractales Orgánicos">Fractales Orgánicos</option>
                      <option value="Celosías Origami">Celosías Origami</option>
                    </select>
                  </div>
                </div>

                {/* Interactive Backlight Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[8px] font-mono uppercase text-neutral-400">
                    <span>Brillo LED Integrado</span>
                    <span>{hardwareBacklight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={hardwareBacklight}
                    onChange={(e) => setHardwareBacklight(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeDept === "software" && (
            <motion.div
              key="software-viewport"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="relative h-2/3 overflow-hidden">
                <img
                  src={departments[2].image}
                  alt="Thalix Software"
                  className="w-full h-full object-cover group-hover/console:scale-105 transition-transform duration-[4000ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                {/* Embedded live Spec Panel for Software */}
                <div className="absolute bottom-4 left-6 text-white text-left">
                  <span className="text-[8px] font-mono tracking-widest text-cyan-400 uppercase font-black">
                    SERVICIOS BACKEND ACTIVOS
                  </span>
                  <Heading className="text-lg font-display uppercase font-bold tracking-tight">
                    {softwareDb} Integration
                  </Heading>
                </div>
              </div>

              {/* Dynamic parameters adjuster (Software interaction) */}
              <div className="p-6 flex-1 bg-white flex flex-col justify-center space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-400">
                    Simulación de Base de Datos y Monitoreo del Servidor
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase text-neutral-400 block">Sincronización</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {["Cloud Firestore", "Cloud SQL (PSQL)"].map((db) => (
                        <button
                          key={db}
                          onClick={() => setSoftwareDb(db)}
                          className={`text-[9px] py-1.5 px-3 rounded-md font-medium text-left transition-all w-full border ${
                            softwareDb === db
                              ? "bg-neutral-900 border-neutral-900 text-white"
                              : "border-neutral-100 hover:border-neutral-200 bg-neutral-50 text-neutral-600"
                          }`}
                        >
                          {db}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase text-neutral-400 block">Velocidad Solicitudes</span>
                    <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-3 space-y-1 text-left font-mono">
                      <p className="text-[7px] text-neutral-400 uppercase">Tiempo de Respuesta</p>
                      <p className="text-xs font-bold text-emerald-600 animate-pulse">{softwareNode}</p>
                      <button 
                        onClick={() => setSoftwareNode(`Optimizado (${(Math.random() * 0.05 + 0.01).toFixed(3)}ms)`)} 
                        className="text-[7px] text-neutral-400 hover:text-neutral-900 uppercase underline cursor-pointer"
                      >
                        [ Reevaluar Latencia ]
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative tag footer inside showcase console */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
            {activeDept === "fashion" && `Estética ${fashionTone} / ${fashionFit}`}
            {activeDept === "hardware" && `Madera: ${hardwareFinish} + ${hardwarePattern}`}
            {activeDept === "software" && `Server State: Autogestionado vía API`}
          </span>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>
    </div>
  );
};

// Internal minimal Title / Heading support component
const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
};
