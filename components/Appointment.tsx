import React from 'react';
import { Video, MapPin, Calendar } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const Appointment: React.FC = () => {
  const book = (type: string) => {
    const message = `Hola, quiero agendar una cita: *${type}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="appointments" className="py-16 px-4 bg-circuit-pattern bg-fixed relative">
      <div className="absolute inset-0 bg-primary/95"></div>
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Agenda tu Reparación</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Evita filas. Elige cómo quieres ser atendido por Yasmani Fragoso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => book('Cita Presencial')}
            className="bg-card p-8 rounded-xl border border-white/10 hover:border-accent transition-all hover:transform hover:-translate-y-1 group text-left"
          >
            <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-primary transition-colors">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cita Presencial</h3>
            <p className="text-gray-400 text-sm">Trae tu equipo al taller en Calle Recodo. Diagnóstico físico inmediato.</p>
          </button>

          <button 
            onClick={() => book('Video-Diagnóstico')}
            className="bg-card p-8 rounded-xl border border-white/10 hover:border-accent transition-all hover:transform hover:-translate-y-1 group text-left"
          >
            <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-primary transition-colors">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Video-Diagnóstico</h3>
            <p className="text-gray-400 text-sm">Evaluación previa por videollamada para ahorrar tiempo. Ideal si vives lejos.</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Appointment;