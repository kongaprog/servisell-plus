
import React, { useState } from 'react';
import { Plus, ShieldCheck, AlertCircle } from 'lucide-react';
import { Product, ProductCondition } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, isInstalled: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [imgError, setImgError] = useState(false);

  const finalPrice = isInstalled ? product.priceInstalled : product.pricePartOnly;

  // Specific text requirements from prompt
  const warrantyText = isInstalled ? "Instalado + Garantía Yasmani" : "Garantía de prueba";

  // Fallback image if URL fails
  const displayImage = imgError || !product.imageUrl
    ? "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80" // Generic tech placeholder
    : product.imageUrl;

  return (
    <div className="bg-brand-card backdrop-blur-sm rounded-xl p-3 border border-white/10 flex flex-col relative h-full hover:border-brand-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 group/card">
      {/* Badge */}
      <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white z-10 ${product.condition === ProductCondition.NEW ? 'bg-green-600' : 'bg-brand-gold text-brand-dark'
        }`}>
        {product.condition === ProductCondition.NEW ? 'NUEVO' : 'DE USO'}
      </span>

      {/* Image */}
      <div className="h-32 bg-brand-dark/50 rounded-lg overflow-hidden mb-3 relative group">
        <img
          src={displayImage}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-heading font-semibold leading-tight mb-2 text-white line-clamp-2 min-h-[2.5em] group-hover/card:text-brand-gold transition-colors">
        {product.title}
      </h3>

      <div className="mt-auto">
        {/* Toggle Switch */}
        <div className="flex justify-between items-center bg-brand-dark rounded p-1 mb-3">
          <button
            onClick={() => setIsInstalled(false)}
            className={`text-xs flex-1 text-center py-1 rounded font-bold transition-all ${!isInstalled ? 'bg-brand-gold text-brand-dark' : 'text-gray-400 hover:text-white'
              }`}
          >
            Pieza
          </button>
          <button
            onClick={() => setIsInstalled(true)}
            className={`text-xs flex-1 text-center py-1 rounded font-bold transition-all ${isInstalled ? 'bg-brand-gold text-brand-dark' : 'text-gray-400 hover:text-white'
              }`}
          >
            Instalada
          </button>
        </div>

        {/* Price and Action */}
        <div className="flex flex-col gap-2">
          <p className={`text-[10px] flex items-center gap-1 ${isInstalled ? 'text-green-400' : 'text-gray-400'}`}>
            {isInstalled ? <ShieldCheck size={10} /> : <AlertCircle size={10} />}
            {warrantyText}
          </p>

          <div className="flex justify-between items-end">
            <p className="text-lg font-bold text-brand-gold font-heading">${finalPrice} <span className="text-[10px] font-normal text-gray-400">USD</span></p>

            <button
              onClick={() => onAddToCart(product, isInstalled)}
              className="bg-gradient-to-r from-brand-gold to-yellow-600 p-2 rounded-full text-brand-dark shadow-lg shadow-brand-gold/20 hover:scale-110 transition-all active:scale-95"
              aria-label="Agregar al carrito"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
