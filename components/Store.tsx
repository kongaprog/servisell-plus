import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, Box, Zap, Smartphone, Info, X, CheckCircle } from 'lucide-react';
import { Product, ProductCondition } from '../types';

interface StoreProps {
  products: Product[];
  categoryFilter: string;
  searchQuery: string;
  setCategoryFilter: (category: string) => void;
  onAddToCart: (product: Product, isInstalled: boolean) => void;
}

const Store: React.FC<StoreProps> = ({ 
  products, 
  categoryFilter, 
  searchQuery, 
  onAddToCart,
  setCategoryFilter
}) => {
  
  // ESTADO PARA LA VENTANA EMERGENTE (MODAL)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // FILTRO
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'Todo' || 
                            product.brand === categoryFilter || 
                            product.partType === categoryFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ESTADÍSTICAS
  const totalStock = products.length;
  const newItems = products.filter(p => p.condition === ProductCondition.NEW).length;

  return (
    <div className="bg-brand-dark min-h-screen pb-20 px-4 pt-8 bg-circuit-pattern relative">
      
      {/* ==========================================
          VENTANA EMERGENTE (MODAL DE DETALLE) 
         ========================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Caja del Modal */}
          <div className="bg-[#0F172A] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.2)] relative flex flex-col md:flex-row">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Columna 1: Imagen Grande */}
            <div className="w-full md:w-1/2 bg-gradient-to-b from-white/5 to-transparent p-8 flex items-center justify-center min-h-[300px]">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.title} 
                className="max-h-[300px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                onError={(e) => {e.currentTarget.src = 'https://via.placeholder.com/300?text=Sin+Imagen'}}
              />
            </div>

            {/* Columna 2: Información Detallada */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              
              {/* Etiquetas */}
              <div className="flex gap-2 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white ${selectedProduct.condition === ProductCondition.NEW ? 'bg-emerald-600' : 'bg-orange-600'}`}>
                  {selectedProduct.condition}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-cyan-300 bg-cyan-950 border border-cyan-800">
                  {selectedProduct.brand}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white font-heading mb-2 leading-tight">
                {selectedProduct.title}
              </h2>
              
              <div className="h-px w-full bg-white/10 my-4"></div>

              {/* DESCRIPCIÓN COMPLETA (Aquí se lee todo) */}
              <div className="flex-1 overflow-y-auto pr-2 mb-6">
                <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Info size={16} /> Detalles del Producto
                </h4>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedProduct.description || "No hay descripción detallada disponible para este producto."}
                </p>
              </div>

              {/* Precios y Acción */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                  <span className="text-gray-400">Precio Pieza</span>
                  <span className="text-2xl font-mono font-bold text-white">${selectedProduct.pricePartOnly}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brand-gold">Precio Instalado</span>
                  <span className="text-3xl font-mono font-bold text-brand-gold">${selectedProduct.priceInstalled}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { onAddToCart(selectedProduct, false); setSelectedProduct(null); }}
                    className="py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all"
                  >
                    Solo Pieza
                  </button>
                  <button 
                    onClick={() => { onAddToCart(selectedProduct, true); setSelectedProduct(null); }}
                    className="py-3 rounded-lg bg-brand-gold text-brand-dark font-bold hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    Quiero Instalación
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          FIN DEL MODAL - INICIO DE LA TIENDA NORMAL
         ========================================== */}

      {/* Panel Superior */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1E293B]/80 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-cyan-500/20 p-3 rounded-lg text-cyan-400"><Box size={24} /></div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-white">{totalStock}</p>
            </div>
          </div>
          <div className="bg-[#1E293B]/80 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-green-500/20 p-3 rounded-lg text-green-400"><Zap size={24} /></div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Nuevos</p>
              <p className="text-2xl font-bold text-white">{newItems}</p>
            </div>
          </div>
          <div className="bg-brand-gold/10 border border-brand-gold/20 p-4 rounded-xl flex items-center gap-4">
             <div className="bg-brand-gold/20 p-3 rounded-lg text-brand-gold"><Smartphone size={24} /></div>
            <div>
              <p className="text-brand-gold/80 text-xs uppercase tracking-wider">Tienda</p>
              <p className="text-xl font-bold text-white">Abierta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2 font-heading">
          <Filter size={24} className="text-brand-gold" />
          Catálogo
        </h2>
        <span className="text-gray-400 text-sm bg-[#1E293B] px-4 py-1 rounded-full border border-white/5">
          {filteredProducts.length} resultados
        </span>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-[#1E293B]/90 backdrop-blur rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col relative">
                
                {/* Imagen (Clickeable para abrir modal) */}
                <div 
                  className="relative h-56 bg-gradient-to-b from-white/5 to-transparent p-6 flex items-center justify-center group-hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="object-contain max-h-full max-w-full drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {e.currentTarget.src = 'https://via.placeholder.com/150?text=Sin+Imagen'}}
                  />
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white shadow-sm ${product.condition === ProductCondition.NEW ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                    {product.condition}
                  </span>
                  {/* Hint visual de "Ver más" */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <Info size={12} /> Ver detalle
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col bg-[#0F172A]">
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-brand-gold transition-colors line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    
                    {/* Descripción corta (con puntos suspensivos) */}
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed min-h-[40px]">
                      {product.description || "Clic para ver detalles..."}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-800/50">{product.brand}</span>
                    </div>
                  </div>

                  {/* Precios */}
                  <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold">Pieza</span>
                        <span className="text-white font-mono font-bold text-lg">${product.pricePartOnly}</span>
                      </div>
                      <button onClick={() => onAddToCart(product, false)} className="p-2 bg-white/5 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all">
                        <ShoppingCart size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/20 cursor-pointer hover:bg-cyan-900/40 transition-colors" onClick={() => onAddToCart(product, true)}>
                      <div className="text-left">
                        <span className="block text-[10px] text-cyan-400 uppercase font-bold">Instalado</span>
                        <span className="text-white font-mono font-bold text-xl">${product.priceInstalled}</span>
                      </div>
                      <div className="h-8 w-8 bg-cyan-400 rounded-full flex items-center justify-center text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                        <Zap size={16} fill="black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 mx-auto max-w-lg">
            <Search className="mx-auto h-16 w-16 text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No encontramos resultados</h3>
            <p className="text-gray-400">Intenta buscar con otro nombre.</p>
            <button onClick={() => setCategoryFilter('Todo')} className="mt-6 text-brand-gold hover:text-white font-bold transition-colors">Ver todo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;