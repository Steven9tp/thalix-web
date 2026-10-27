import React from "react";
import { motion } from "motion/react";
import { 
  User as UserIcon, 
  ShoppingBag, 
  Award, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Gift, 
  Ticket, 
  Package, 
  Info, 
  Truck, 
  Store,
  LogIn
} from "lucide-react";
import { User, View } from "../types";
import { STORE_INFO } from "../constants";

interface ProfileViewProps {
  user: User | null;
  setCurrentView: (view: View) => void;
  onLogout?: () => void;
}

export const ProfileView = ({ user, setCurrentView, onLogout }: ProfileViewProps) => {
  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-8 border border-black/5 shadow-inner">
          <UserIcon className="w-10 h-10 text-black/30" />
        </div>
        <h2 className="text-4xl font-display font-bold uppercase tracking-tighter mb-4 text-black">Mi Cuenta</h2>
        <p className="text-black/50 max-w-md mb-8 text-sm leading-relaxed">
          Inicia sesión o regístrate para ver tu historial de pedidos, seguimiento de envíos y recompensas exclusivas en Thalix.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => (window as any).setIsAuthOpen?.(true)}
            className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" /> Iniciar Sesión / Registro
          </button>
          <button 
            onClick={() => setCurrentView('landing')}
            className="px-8 py-4 border border-black/10 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-black/5 transition-all text-black cursor-pointer"
          >
            Explorar Tienda
          </button>
        </div>
      </div>
    );
  }

  const rewardThresholds = [
    { limit: 50, reward: "Cupón 5% Descuento", icon: Ticket },
    { limit: 100, reward: "Cupón 10% Descuento", icon: Ticket },
    { limit: 1000, reward: "Producto MDF Gratis", icon: Package },
    { limit: 2000, reward: "Regalo Sorpresa Premium", icon: Gift },
  ];

  const nextReward = rewardThresholds.find(t => user.totalSpent < t.limit);
  const progress = nextReward ? (user.totalSpent / nextReward.limit) * 100 : 100;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-black/5 shadow-sm text-center">
            <div className="w-32 h-32 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
              <UserIcon className="w-12 h-12 text-black/20" />
            </div>
            <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-2 text-black">{user.name}</h2>
            <p className="text-black/40 text-xs font-bold uppercase tracking-widest mb-8">{user.email}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-1">Total Gastado</span>
                <span className="text-xl font-mono font-bold text-black">${user.totalSpent.toFixed(2)}</span>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-black/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-1">Pedidos</span>
                <span className="text-xl font-mono font-bold text-black">{user.purchaseHistory.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-6 border border-black/5 shadow-sm space-y-2">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-2xl transition-all group text-red-600 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Cerrar Sesión</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Rewards Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold uppercase tracking-tighter flex items-center gap-3 text-black">
                <Award className="w-6 h-6" /> Recompensas Thalix
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 bg-zinc-100 px-3 py-1 rounded-full">
                Nivel: {user.totalSpent > 1000 ? 'Elite' : 'Comprador'}
              </span>
            </div>

            <div className="bg-black text-white rounded-[3rem] p-10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10">
                {nextReward ? (
                  <>
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Próximo Objetivo</p>
                        <h4 className="text-3xl font-display font-bold uppercase tracking-tight">{nextReward.reward}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-mono font-bold">${user.totalSpent.toFixed(0)}</span>
                        <span className="text-white/40 font-mono"> / ${nextReward.limit}</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-6">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, progress)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-white h-full rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <div className="mb-4">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Nivel Máximo</p>
                    <h4 className="text-3xl font-display font-bold uppercase tracking-tight">¡Eres Miembro VIP Legendario!</h4>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
                  {rewardThresholds.map((r, i) => {
                    const isUnlocked = user.totalSpent >= r.limit;
                    const Icon = r.icon;
                    return (
                      <div key={i} className={`p-4 rounded-2xl border ${isUnlocked ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent opacity-40'}`}>
                        <Icon className="w-5 h-5 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">${r.limit}</span>
                        <span className="text-xs font-medium text-white/80">{r.reward}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Order History */}
          <section>
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-8 flex items-center gap-3 text-black">
              <ShoppingBag className="w-6 h-6" /> Historial de Pedidos ({user.purchaseHistory.length})
            </h3>

            {user.purchaseHistory.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-12 text-center border border-black/5 shadow-sm">
                <Package className="w-12 h-12 text-black/20 mx-auto mb-4" />
                <p className="text-black/40 text-sm uppercase tracking-widest font-bold">No tienes compras registradas todavía.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {user.purchaseHistory.map((order) => (
                  <div key={order.id} className="bg-white rounded-[2rem] p-6 border border-black/5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-bold text-sm text-black">{order.id}</span>
                        <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                          {order.status === 'completed' ? 'Completado' : order.status}
                        </span>
                      </div>
                      <p className="text-xs text-black/40 mb-2">{new Date(order.date).toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-xs text-black/70 font-medium">{order.items.join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-mono font-bold block text-black">${order.total.toFixed(2)}</span>
                      <span className="text-[10px] uppercase font-bold text-black/40">
                        {order.shippingMethod === 'pickup' ? 'Retiro en Tienda' : 'Envío a Domicilio'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
