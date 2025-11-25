import React from 'react';
import { ArrowLeft, Lock, UserCheck, Database } from 'lucide-react';

const Privacy = ({ onBack }: { onBack: () => void }) => {
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
          <Lock size={32} className="text-brand-gold" />
          <h1 className="text-3xl font-bold text-white font-heading">Política de Privacidad</h1>
        </div>
        
        <div className="space-y-8 text-sm leading-relaxed">
          
          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Database size={20} className="text-cyan-400"/> 1. Datos que recolectamos
            </h3>
            <p>
              ServiSell Plus solo solicita los datos estrictamente necesarios para realizar el servicio:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
              <li>Nombre del cliente (para identificar el equipo).</li>
              <li>Número de teléfono (para notificar cuando esté listo).</li>
              <li>Contraseña de desbloqueo (SOLO si es indispensable para probar funciones).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <UserCheck size={20} className="text-green-400"/> 2. Uso de tu Información
            </h3>
            <p>
              Tus datos son sagrados. <strong>NUNCA</strong> vendemos, alquilamos ni compartimos tu número de teléfono con terceros para publicidad.
              Solo te contactaremos para asuntos relacionados con tu reparación o compra.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Lock size={20} className="text-purple-400"/> 3. Seguridad de tus Archivos
            </h3>
            <p className="mb-2">
              Nuestros técnicos tienen un código ético estricto. Accedemos al sistema del celular únicamente para verificar:
            </p>
            <ul className="list-grid grid-cols-2 gap-2 pl-5 text-gray-400">
              <li>• Cámaras</li>
              <li>• Micrófonos</li>
              <li>• Pantalla táctil</li>
              <li>• Señal</li>
            </ul>
            <p className="mt-3 text-white font-medium bg-white/5 p-3 rounded border border-white/10">
              No revisamos galerías de fotos, chats de WhatsApp ni redes sociales bajo ninguna circunstancia.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;