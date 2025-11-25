import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, Clock, FileText } from 'lucide-react';

const Terms = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-brand-dark text-gray-300 p-4 pt-8 bg-circuit-pattern">
      <div className="max-w-3xl mx-auto bg-[#1E293B]/95 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-brand-gold mb-8 hover:translate-x-[-5px] transition-transform font-bold"
        >
          <ArrowLeft size={20} /> Volver a la Tienda
        </button>
        
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-6">
          <FileText size={32} className="text-brand-gold" />
          <h1 className="text-3xl font-bold text-white font-heading">Términos del Servicio</h1>
        </div>
        
        <div className="space-y-8 text-sm leading-relaxed">
          
          {/* Sección 1 */}
          <section className="bg-black/20 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Shield size={20} className="text-cyan-400"/> 1. Garantía de Reparación
            </h3>
            <p>
              En ServiSell Plus, ofrecemos una garantía de <strong>30 días naturales</strong> sobre la mano de obra y las piezas reemplazadas. 
              Esta garantía cubre exclusivamente defectos de fábrica de los repuestos instalados o errores directos en el montaje.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="bg-black/20 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle size={20} className="text-orange-500"/> 2. Lo que NO cubre la garantía
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Equipos mojados o con humedad posterior a la reparación.</li>
              <li>Golpes, caídas, aplastamientos o rayones profundos.</li>
              <li>Pantallas con manchas negras o líneas de colores causadas por presión excesiva del usuario.</li>
              <li>Equipos manipulados por otros técnicos ajenos a ServiSell Plus.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="bg-black/20 p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Clock size={20} className="text-green-400"/> 3. Tiempos y Entregas
            </h3>
            <p>
              Los diagnósticos complejos pueden tomar de 24 a 48 horas. Las reparaciones de pantalla y batería suelen realizarse el mismo día, 
              sujeto a la disponibilidad de la pieza en nuestro almacén.
            </p>
            <p className="mt-2 text-yellow-500/80 text-xs">
              * Si el equipo no es recogido en un plazo de 60 días, pasará a almacén por abandono.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;