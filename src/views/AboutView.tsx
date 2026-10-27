import React from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Globe,
  Users,
  Target,
  Award
} from "lucide-react";

export const AboutView = () => {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Hero Section containing "Nuestra Esencia / Thalix Creative Hub" and Scene */}
        <div className="grid md:grid-cols-12 gap-16 items-center mb-32 pt-12 relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none z-0">
            <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-black" />
            <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-black" />
          </div>

          {/* Left: The text layout exactly matching the user's essence description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 space-y-10 relative z-10"
          >
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.5em] text-black/40 font-bold block bg-zinc-50 py-1.5 px-4 rounded-full w-fit border border-black/[0.03]">
                Nuestra Esencia
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-black leading-[0.9]">
                Thalix <br /> <span className="text-black/35 font-light">Creative Hub</span>
              </h1>
            </div>

            <div className="space-y-8 max-w-xl">
              <p className="text-2xl text-black font-light leading-relaxed">
                Fusionamos moda, diseño industrial, software empresarial y activos digitales en un solo universo fluido.
              </p>
              <p className="text-black/60 leading-relaxed text-xs uppercase tracking-[0.2em] font-medium">
                Reconocidos por nuestra estética cautivadora, Thalix lidera la industria del diseño de lujo. Combinamos tecnología de vanguardia con una visión artística sin igual.
              </p>
            </div>
          </motion.div>

          {/* Right: Beautiful luxury architectural branding image inside soft organic frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 aspect-square w-full relative flex items-center justify-center max-w-lg mx-auto rounded-[4rem] overflow-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.1)] z-10 group"
          >
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
              alt="Thalix Architectural Exhibit"
              className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-6 text-[8px] font-mono tracking-widest text-white/75 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-none select-none">
              [ THX_ARCHITECTURAL_EXHIBIT ]
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-zinc-50 rounded-[3rem] space-y-6"
          >
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter">Misión</h3>
            <p className="text-black/60 leading-relaxed">
              Empoderar a individuos y empresas mediante soluciones creativas que integran moda, diseño industrial y software de vanguardia.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 bg-zinc-50 rounded-[3rem] space-y-6"
          >
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter">Visión</h3>
            <p className="text-black/60 leading-relaxed">
              Ser el referente global en la creación de ecosistemas digitales y físicos donde la estética y la funcionalidad no tienen límites.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 bg-zinc-50 rounded-[3rem] space-y-6"
          >
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter">Valores</h3>
            <p className="text-black/60 leading-relaxed">
              Innovación constante, excelencia en el diseño, sostenibilidad y un compromiso inquebrantable con la calidad.
            </p>
          </motion.div>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-black/40 font-bold mb-6 block">Contacto</span>
              <h2 className="text-6xl font-display font-bold uppercase tracking-tighter leading-none">Hablemos de <br /> tu próximo <br /> proyecto.</h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 border border-black/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Email</p>
                  <p className="text-lg font-medium">contacto@thalix.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 border border-black/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Teléfono</p>
                  <p className="text-lg font-medium">+593 99 999 9999</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 border border-black/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Ubicación</p>
                  <p className="text-lg font-medium">Quito, Ecuador - Creative District</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 pt-8">
              <button className="p-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black text-white p-12 md:p-20 rounded-[4rem] space-y-12"
          >
            <h3 className="text-4xl font-display font-bold uppercase tracking-tighter">Envíanos un mensaje</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Nombre Completo</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors" placeholder="Tu nombre..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Mensaje</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors resize-none" placeholder="¿Cómo podemos ayudarte?" />
              </div>
              <button className="w-full py-6 bg-white text-black rounded-full font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-zinc-200 transition-all">
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
