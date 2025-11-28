import React from 'react';
import { Wrench, Smartphone, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onGoToStore: () => void;
  onGoToServices: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGoToStore, onGoToServices }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B1120]">
      
      {/* FONDO TECNOLÓGICO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent"></div>
        
        {/* Rejilla decorativa */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* COLUMNA IZQUIERDA: TEXTO */}
        <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold tracking-widest animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            TALLER CERTIFICADO
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-heading drop-shadow-lg">
            Reparación <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold">
              Nivel Experto
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            No somos simples cambiadores de piezas. Somos especialistas en microelectrónica y recuperación de dispositivos móviles. Tu tecnología merece manos profesionales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <button 
               onClick={onGoToServices}
               className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold overflow-hidden hover:bg-white/10 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
             >
               <div className="flex items-center gap-2">
                 <Wrench size={20} className="text-gray-400 group-hover:text-white transition-colors"/>
                 <span>Ver Servicios</span>
               </div>
             </button>

             <button 
               onClick={onGoToStore}
               className="group relative px-8 py-4 bg-gradient-to-r from-brand-gold to-yellow-600 rounded-xl text-brand-dark font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:scale-105 active:scale-95"
             >
               <div className="flex items-center gap-2">
                 <span>Ir a la Tienda</span>
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
               </div>
             </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm font-medium pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-500" />
              <span>Garantía Real</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-cyan-500" />
              <span>Repuestos Originales</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: VISUAL 3D / FLOTANTE */}
        <div className="relative hidden lg:block h-[600px]">
          {/* Círculo Brillante de Fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Imagen Principal con Efecto Cristal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[550px] bg-black/40 backdrop-blur-md border border-white/10 rounded-[3rem] p-4 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-all duration-700 z-10 group">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1592434134753-a70baf7979d5?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center rounded-[2.5rem] opacity-80 group-hover:opacity-100 transition-opacity"></div>
             
             {/* Tarjetas Flotantes */}
             <div className="absolute -right-12 top-20 bg-[#1E293B] p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-cyan-500/20 p-2 rounded-lg"><Cpu size={24} className="text-cyan-400"/></div>
                <div>
                  <p className="text-xs text-cyan-400 font-bold uppercase">Diagnóstico</p>
                  <p className="text-white font-bold">100% Preciso</p>
                </div>
             </div>

             <div className="absolute -left-12 bottom-32 bg-[#1E293B] p-4 rounded-2xl border border-brand-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="bg-brand-gold/20 p-2 rounded-lg"><Smartphone size={24} className="text-brand-gold"/></div>
                <div>
                  <p className="text-xs text-brand-gold font-bold uppercase">Reparación</p>
                  <p className="text-white font-bold">Express</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;