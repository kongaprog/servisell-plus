import React from 'react';
import { Cpu, MonitorSmartphone, Settings } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Cpu size={40} />,
      title: "Microsoldadura",
      desc: "Reparación a nivel de componente. Reballing, cortos, conectores FPC."
    },
    {
      icon: <MonitorSmartphone size={40} />,
      title: "Hardware",
      desc: "Cambio de pantallas, baterías, puertos de carga y carcasas con acabado original."
    },
    {
      icon: <Settings size={40} />,
      title: "Software",
      desc: "Desbloqueos, flasheo, optimización de sistema y recuperación de datos."
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-center mb-16">
          Laboratorio Técnico
          <span className="block w-24 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-6"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-brand-card backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;