import React from 'react';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    let message = "👋 Hola ServiSell Plus, quiero realizar este pedido:\n\n";
    items.forEach(item => {
      message += `▪️ ${item.product.title}\n   (${item.isInstalled ? 'Instalado' : 'Solo Pieza'}) - $${item.price} x${item.quantity}\n`;
    });
    message += `\n💰 *Total Estimado: $${total} USD*`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-brand-dark h-full shadow-2xl flex flex-col border-l border-brand-light transform transition-transform duration-300 animate-in slide-in-from-right">
        <div className="p-4 border-b border-brand-light flex items-center justify-between bg-brand-dark/95">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Tu Pedido <span className="text-sm text-gray-400 font-normal">({items.length} ítems)</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p>El carrito está vacío.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="bg-brand-light/20 rounded-lg p-3 flex gap-3 border border-white/5">
                <img src={item.product.imageUrl} className="w-16 h-16 object-cover rounded" alt="" />
                <div className="flex-1">
                   <h4 className="text-sm font-semibold text-white line-clamp-1">{item.product.title}</h4>
                   <p className="text-xs text-gray-400 mb-1">
                     {item.isInstalled ? 'Instalado (+Garantía)' : 'Solo Pieza'}
                   </p>
                   <div className="flex justify-between items-center">
                     <span className="text-brand-gold font-bold">${item.price}</span>
                     <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">Cant: {item.quantity}</span>
                        <button onClick={() => onRemove(idx)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                     </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-brand-light bg-brand-dark">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span className="text-white">Total</span>
              <span className="text-brand-gold">${total} USD</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
            >
              <MessageCircle size={20} />
              Enviar Pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;