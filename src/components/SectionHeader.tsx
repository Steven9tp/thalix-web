import React from "react";
import { motion } from "motion/react";

export const SectionHeader = ({ number, title, subtitle, dark = false }: { number: string, title: string, subtitle: string, dark?: boolean }) => (
  <div className="mb-20 overflow-hidden">
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-6"
    >
      <span className={`text-xs font-mono font-bold ${dark ? 'text-black' : 'text-white'}`}>{number}</span>
      <div className={`h-[1px] w-24 ${dark ? 'bg-black/20' : 'bg-white/20'}`} />
      <span className={`text-[10px] uppercase tracking-[0.5em] font-bold ${dark ? 'text-black/40' : 'text-white/40'}`}>{subtitle}</span>
    </motion.div>
    <motion.h2 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`text-7xl md:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter uppercase ${dark ? 'text-black' : 'text-white'}`}
    >
      {title}
    </motion.h2>
  </div>
);
