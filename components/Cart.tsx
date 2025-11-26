import React from 'react';
import { X, Trash2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
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

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const sendToWhatsApp = () => {
    const message = items.map(item => 
      `▪️ ${item.product.title} (${item.isInstalled ? 'Instalado' : 'Producto'}) - $${item.price}`
    ).join('%0A');
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola ServiSell, quiero comprar:%0A%0A${message}%0A%0A💰 *Total: $${total}*`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo borroso oscuro */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Panel Deslizante */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pointer-events-none">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-[#0F172A] border-l border-white/10 shadow-2xl">
            
            {/* Cabecera */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B1120]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
                <ShoppingBag className="text-brand-gold" /> Tu Pedido
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={64} className="mb-4 text-gray-600" />
                  <p className="text-lg font-medium text-gray-400">El carrito está vacío</p>
                  <button onClick={onClose} className="mt-4 text-brand-gold hover:underline">Volver a la tienda</button>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="flex gap-4 bg-[#1E293B]/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all group">
                    {/* Imagen Miniatura */}
                    <div className="h-20 w-20 bg-white/5 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.title} 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {e.currentTarget.src = 'https://via.placeholder.com/100?text=Sin+Imagen'}} 
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">{item.product.title}</h3>
                        
                        {/* Lógica de Etiquetas Inteligente */}
                        <div className="mt-1 flex flex-wrap gap-2">
                          {/* Si el precio instalado es > 0, diferenciamos. Si es 0 (móvil), no ponemos etiqueta de "pieza" */}
                          {(item.product.priceInstalled > 0) && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.isInstalled ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' : 'bg-gray-700 text-gray-300 border-gray-600'}`}>
                              {item.isInstalled ? 'CON INSTALACIÓN' : 'REPUESTO'}
                            </span>
                          )}
                          <span className="text-[10px] bg-black/30 text-gray-400 px-2 py-0.5 rounded border border-white/5">
                            Cant: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <span className="font-mono font-bold text-lg text-white">${item.price * item.quantity}</span>
                        <button 
                          onClick={() => onRemove(index)} 
                          className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-400/10 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pie de página (Total y Botón) */}
            {items.length > 0 && (
              <div className="border-t border-white/10 bg-[#0B1120] p-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-400">Total a Pagar</span>
                  <span className="text-2xl font-bold font-mono text-brand-gold">${total}</span>
                </div>
                
                <button 
                  onClick={sendToWhatsApp}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={24} />
                  Pedir por WhatsApp
                  <ArrowRight size={20} className="opacity-70" />
                </button>
                
                <p className="text-center text-xs text-gray-500">
                  Al hacer clic, se abrirá WhatsApp con los detalles de tu pedido.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;