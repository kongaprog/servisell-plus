import React, { useState } from 'react';
import { Cpu, Smartphone, Zap, X, CheckCircle, PenTool, Layers, Binary } from 'lucide-react';

// --- DATOS DE LOS SERVICIOS (Aquí puedes editar los textos técnicos) ---
const detailedServices = [
  {
    id: 'microsoldering',
    title: 'Laboratorio de Microsoldadura',
    shortDesc: 'Reparación de placas base a nivel componente.',
    icon: <Cpu size={40} />,
    color: 'text-brand-gold',
    bgGradient: 'from-orange-500/20 to-brand-gold/5',
    borderColor: 'border-brand-gold/30',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1974&auto=format&fit=crop', // Foto de microscopio
    description: "Nuestro laboratorio cuenta con equipamiento de precisión para intervenir la placa madre (logic board) de tu dispositivo. Recuperamos equipos que otros dieron por muertos.",
    features: [
      "Reballing de CPU y Memoria",
      "Reparación de Face ID y Touch ID",
      "Solución a fallas de Carga (IC de carga)",
      "Reconstrucción de pistas dañadas",
      "Solución a equipos mojados (Baño Químico)",
      "Reparación de fallas de Audio (Codec)"
    ]
  },
  {
    id: 'hardware',
    title: 'Hardware y Periféricos',
    shortDesc: 'Sustitución de componentes físicos dañados.',
    icon: <Smartphone size={40} />,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-blue-600/5',
    borderColor: 'border-cyan-500/30',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop', // Foto de celular abierto
    description: "Utilizamos repuestos de calidad original o certificados. Cada instalación incluye sellado contra polvo y humedad, garantizando que tu equipo mantenga su integridad.",
    features: [
      "Cambio de Pantallas (Original / OLED / Incell)",
      "Reemplazo de Baterías con condición 100%",
      "Cambio de Chasis y Tapas traseras",
      "Reparación de Cámaras y Lentes",
      "Limpieza y mantenimiento de Altavoces",
      "Sustitución de Puertos de Carga"
    ]
  },
  {
    id: 'software',
    title: 'Software y Desbloqueos',
    shortDesc: 'Optimización y recuperación de sistemas operativos.',
    icon: <Binary size={40} />,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-pink-600/5',
    borderColor: 'border-purple-500/30',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', // Foto de código
    description: "Soluciones lógicas para devolver la vida a tu sistema. Trabajamos con las últimas herramientas de flasheo y liberación para iOS y Android.",
    features: [
      "Flasheo y Actualización de Sistema",
      "Desbloqueo de Cuenta Google (FRP)",
      "Desbloqueo de Cuenta Mi (Xiaomi)",
      "Recuperación de Datos (Fotos/Contactos)",
      "Solución a 'Bootloop' (Reinicio constante)",
      "Optimización de rendimiento"
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof detailedServices[0] | null>(null);

  return (
    <section id="services" className="py-20 bg-[#0B1120] relative overflow-hidden">
      
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Especialidades</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">
            Laboratorio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Técnico</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Selecciona una categoría para conocer nuestros procesos profesionales.
          </p>
        </div>

        {/* GRID DE TARJETAS (Menú Principal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {detailedServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group relative p-8 rounded-3xl border ${service.borderColor} bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
            >
              <div className={`mb-6 p-4 rounded-2xl bg-[#0B1120]/50 w-fit ${service.color} group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.shortDesc}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-wider">
                Ver Procesos <PenTool size={14} />
              </div>

              {/* Efecto de brillo al pasar mouse */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL DETALLADO (POP-UP) --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          
          <div className="bg-[#0F172A] w-full md:w-full md:max-w-5xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl border-0 md:border border-white/10 shadow-2xl relative flex flex-col md:flex-row overflow-hidden">
            
            {/* Botón Cerrar (Flotante) */}
            <button 
              onClick={() => setSelectedService(null)} 
              className="absolute top-4 right-4 z-20 p-3 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
            >
              <X size={24} />
            </button>

            {/* COLUMNA 1: IMAGEN (Banner en móvil, lateral en PC) */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
               <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0F172A] via-transparent to-transparent z-10`}></div>
               <img 
                 src={selectedService.image} 
                 alt={selectedService.title} 
                 className="w-full h-full object-cover opacity-80"
               />
               <div className="absolute bottom-4 left-4 z-20 md:hidden">
                 <h3 className={`text-2xl font-bold ${selectedService.color} font-heading`}>{selectedService.title}</h3>
               </div>
            </div>

            {/* COLUMNA 2: INFORMACIÓN (Scrollable) */}
            <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto flex flex-col bg-[#0F172A]">
              
              <div className="hidden md:block mb-6">
                 <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border ${selectedService.borderColor} ${selectedService.color} text-xs font-bold uppercase tracking-widest mb-4`}>
                    <Layers size={14} /> Especialidad Técnica
                 </div>
                 <h2 className="text-4xl font-bold text-white font-heading">{selectedService.title}</h2>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-white/10 pl-4">
                {selectedService.description}
              </p>

              <div className="bg-[#0B1120] rounded-2xl p-6 border border-white/5 mb-8">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20}/>
                  Procedimientos Incluidos:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 text-gray-400 text-sm p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full ${selectedService.color.replace('text-', 'bg-')}`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                 <p className="text-xs text-gray-500">
                   * El tiempo de reparación varía según disponibilidad de piezas.
                 </p>
                 <button 
                   onClick={() => setSelectedService(null)} // O podrías poner una función para ir a contacto/cita
                   className={`px-6 py-3 rounded-xl font-bold text-black transition-all hover:scale-105 active:scale-95 ${selectedService.id === 'microsoldering' ? 'bg-brand-gold' : selectedService.id === 'hardware' ? 'bg-cyan-400' : 'bg-purple-400'}`}
                 >
                   Entendido
                 </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;