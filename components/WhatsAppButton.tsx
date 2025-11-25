import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const message = "Hola ServiSell Plus, tengo una consulta.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center border-2 border-white/20"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
};

export default WhatsAppButton;