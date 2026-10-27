import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Sparkles, Zap, Heart, Star } from 'lucide-react';
import { INSPIRED_MDF_GALLERY } from '../constants';

interface PersonalizedGalleryViewProps {
  onBack: () => void;
}

export const PersonalizedGalleryView = ({ onBack: _onBack }: PersonalizedGalleryViewProps) => {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden pt-32">
      {/* Premium Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <main className="relative z-10 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full">
              <Sparkles className="w-3 h-3 text-black" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Servicio de Personalización Premium</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.85]">
              Tu Visión,<br />
              <span className="text-zinc-300">Nuestra Maestría.</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="max-w-xl text-zinc-500 text-sm md:text-base uppercase tracking-widest font-medium leading-relaxed">
                Explora nuestra galería de inspiración y descubre cómo transformamos tus ideas en piezas únicas de artesanía con tecnología láser de vanguardia.
              </p>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-2xl font-display font-bold">500+</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Proyectos Entregados</p>
                </div>
                <div className="w-px h-10 bg-zinc-200" />
                <div className="text-right">
                  <p className="text-2xl font-display font-bold">100%</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Satisfacción</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery Grid - Masonry Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {INSPIRED_MDF_GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group cursor-pointer ${
                index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'
              }`}
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:h-[500px] overflow-hidden rounded-[2.5rem] bg-zinc-100 mb-8">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">{item.title}</h3>
                    <p className="text-white/60 text-xs uppercase tracking-widest leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                    <div className="pt-4">
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/20 pb-2">
                        Ver Detalles del Proyecto
                      </span>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-[10px] font-bold">
                  0{index + 1}
                </div>
              </div>
              <div className="md:hidden space-y-2 px-4">
                <h3 className="text-xl font-display font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-24 rounded-[4rem] bg-black text-white text-center space-y-12 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/50 rounded-full animate-pulse delay-75" />
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-xs md:text-sm uppercase tracking-[0.3em] leading-loose">
              Desde regalos personalizados hasta proyectos a gran escala. Nuestro equipo está listo para dar vida a tus ideas con la más alta precisión.
            </p>
          </div>

          <div className="relative z-10">
            <a 
              href="https://wa.me/593987654321?text=Hola! Tengo una idea para un proyecto personalizado en MDF..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full font-bold uppercase text-sm tracking-[0.4em] hover:scale-105 transition-all group"
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Consultar por WhatsApp
            </a>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            <div className="space-y-2">
              <Zap className="w-5 h-5 mx-auto text-zinc-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Precisión Láser</p>
            </div>
            <div className="space-y-2">
              <Heart className="w-5 h-5 mx-auto text-zinc-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Hecho a Mano</p>
            </div>
            <div className="space-y-2">
              <Star className="w-5 h-5 mx-auto text-zinc-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Calidad Premium</p>
            </div>
            <div className="space-y-2">
              <Sparkles className="w-5 h-5 mx-auto text-zinc-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Diseño Único</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
