import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, MessageSquare } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Por favor completa todos los campos requeridos (Nombre, Correo y Mensaje).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/wp-json/thalix/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'No se pudo enviar el mensaje. Por favor intenta nuevamente.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Error de conexión al enviar el formulario. Intenta nuevamente.');
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <SectionHeader 
        title="Contáctanos" 
        subtitle="Hablemos de tu próximo proyecto. Envíanos un mensaje y te responderemos a la brevedad." 
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Atención Directa</span>
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight mb-4">
              ¿Tienes una consulta o cotización personalizada?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Nuestro equipo está disponible para ayudarte con pedidos en ropa exclusiva, artesanías en MDF, desarrollo de software a medida o setup gaming.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl shrink-0 text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Correo Electrónico</p>
                  <p className="text-sm font-medium text-white select-all">steven2001cesar@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl shrink-0 text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Teléfono / WhatsApp</p>
                  <p className="text-sm font-medium text-white">+593 99 999 9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl shrink-0 text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Ubicación</p>
                  <p className="text-sm font-medium text-white">Ambato - Ecuador</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl shrink-0 text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Horario de Atención</p>
                  <p className="text-sm font-medium text-white">Lunes a Sábado: 08:00 - 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-xl"
        >
          <h3 className="text-xl font-bold text-black tracking-tight mb-2">
            Envíanos un mensaje
          </h3>
          <p className="text-zinc-500 text-sm mb-8">
            Llena el siguiente formulario y llegará directamente a nuestra bandeja de correo.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4 text-emerald-800"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Hemos recibido tu información y nos pondremos en contacto contigo lo antes posible.
                  </p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4 text-red-800"
              >
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">No se pudo enviar</h4>
                  <p className="text-xs text-red-700 mt-1">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre y apellido"
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Teléfono / WhatsApp
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+593 99 999 9999"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                  Asunto
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Cotización, Soporte o Pedido"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Cuéntanos los detalles de tu consulta o requerimiento..."
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 px-8 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Enviando mensaje...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
