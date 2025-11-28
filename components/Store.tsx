import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, Box, Zap, Smartphone, Info, X, CheckCircle, Package } from 'lucide-react';
import { Product, ProductCondition } from '../types';

interface StoreProps {
  products: Product[];
  categoryFilter: string;
  searchQuery: string;
  setCategoryFilter: (category: string) => void;
  setSearchQuery: (query: string) => void;
  onAddToCart: (product: Product, isInstalled: boolean) => void;
}

const Store: React.FC<StoreProps> = ({ 
  products, 
  categoryFilter, 
  searchQuery, 
  onAddToCart,
  setCategoryFilter,
  setSearchQuery
}) => {
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["Todo", "Móvil", "Pantalla", "Batería", "Samsung", "Apple", "Xiaomi"];

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'Todo' || 
                            product.brand.toLowerCase() === categoryFilter.toLowerCase() || 
                            product.partType.toLowerCase() === categoryFilter.toLowerCase() ||
                            product.deviceType.toLowerCase() === categoryFilter.toLowerCase();
    
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
                          
    return matchesCategory && matchesSearch;
  });

  const totalStock = products.length;
  const newItems = products.filter(p => p.condition === ProductCondition.NEW).length;

  const isSimpleProduct = (product: Product) => {
    return !product.priceInstalled || product.priceInstalled === 0 || product.priceInstalled === product.pricePartOnly;
  };

  return (
    <div className="bg-[#0B1120] min-h-screen pb-20 px-4 pt-8 relative overflow-hidden">
      
      {/* FONDO AMBIENTAL (Luces sutiles) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- MODAL DE DETALLE (POP-UP) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0F172A] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative flex flex-col md:flex-row overflow-hidden">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-red-500 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm">
              <X size={20} />
            </button>

            {/* Columna Imagen */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-white/5 to-[#0B1120] p-8 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="max-h-[300px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 hover:scale-105 transition-transform duration-500" onError={(e) => {e.currentTarget.src = 'https://via.placeholder.com/300?text=Sin+Imagen'}} />
            </div>

            {/* Columna Info */}
            <div className="w-full md:w-1/2 p-8 flex flex-col bg-[#0F172A]">
              <div className="flex gap-2 mb-4">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white border ${selectedProduct.condition === ProductCondition.NEW ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-orange-500/10 border-orange-500 text-orange-400'}`}>
                   {selectedProduct.condition}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-500/30">{selectedProduct.brand}</span>
              </div>

              <h2 className="text-3xl font-bold text-white font-heading mb-4 leading-tight">{selectedProduct.title}</h2>
              
              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5">
                 <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Info size={14} /> Especificaciones</h4>
                 <p className="text-gray-300 text-sm leading-relaxed">{selectedProduct.description || "Producto certificado por ServiSell Plus."}</p>
              </div>

              <div className="mt-auto space-y-4">
                {isSimpleProduct(selectedProduct) ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-400 text-sm">Precio Final</span>
                      <span className="text-4xl font-mono font-bold text-brand-gold tracking-tight">${selectedProduct.pricePartOnly}</span>
                    </div>
                    <button onClick={() => { onAddToCart(selectedProduct, false); setSelectedProduct(null); }} className="w-full py-4 rounded-xl bg-brand-gold text-brand-dark font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 flex items-center justify-center gap-2">
                      <ShoppingCart size={20} /> Añadir al Carrito
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 rounded-lg border border-white/10 hover:border-white/30 transition-colors cursor-pointer" onClick={() => { onAddToCart(selectedProduct, false); setSelectedProduct(null); }}>
                          <p className="text-gray-500 text-xs uppercase font-bold">Solo Pieza</p>
                          <p className="text-2xl font-mono text-white font-bold">${selectedProduct.pricePartOnly}</p>
                          <span className="text-xs text-cyan-400 flex items-center gap-1 mt-1"><Package size={12}/> Envío Rápido</span>
                       </div>
                       <div className="p-3 rounded-lg border border-brand-gold/30 bg-brand-gold/5 hover:bg-brand-gold/10 transition-colors cursor-pointer relative overflow-hidden" onClick={() => { onAddToCart(selectedProduct, true); setSelectedProduct(null); }}>
                          <div className="absolute top-0 right-0 p-1 bg-brand-gold text-[8px] text-black font-bold rounded-bl-lg">RECOMENDADO</div>
                          <p className="text-brand-gold text-xs uppercase font-bold">Instalado</p>
                          <p className="text-2xl font-mono text-white font-bold">${selectedProduct.priceInstalled}</p>
                          <span className="text-xs text-green-400 flex items-center gap-1 mt-1"><CheckCircle size={12}/> Garantía Incluida</span>
                       </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ESTADÍSTICAS --- */}
      <div className="max-w-7xl mx-auto mb-10 hidden md:block relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1E293B]/60 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-cyan-500/30 transition-colors group">
            <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform"><Box size={24} /></div>
            <div><p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Stock Disponible</p><p className="text-2xl font-mono font-bold text-white">{totalStock}</p></div>
          </div>
          <div className="bg-[#1E293B]/60 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-green-500/30 transition-colors group">
            <div className="bg-green-500/10 p-3 rounded-xl text-green-400 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
            <div><p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Novedades</p><p className="text-2xl font-mono font-bold text-white">{newItems}</p></div>
          </div>
          <div className="bg-gradient-to-r from-brand-gold/10 to-transparent border border-brand-gold/20 p-4 rounded-2xl flex items-center gap-4">
             <div className="bg-brand-gold/20 p-3 rounded-xl text-brand-gold animate-pulse"><Smartphone size={24} /></div>
            <div><p className="text-brand-gold/80 text-xs uppercase tracking-wider font-bold">Estado Tienda</p><p className="text-xl font-bold text-white">En Línea 🟢</p></div>
          </div>
        </div>
      </div>

      {/* --- BARRA DE CONTROL (BUSCADOR Y FILTROS) --- */}
      <div className="max-w-7xl mx-auto mb-8 space-y-6 relative z-10">
        
        {/* Buscador Futurista */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-gray-500 group-focus-within:text-brand-gold transition-colors" size={22} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por modelo, pieza, marca..."
            className="w-full bg-[#1E293B]/80 backdrop-blur-sm border border-white/10 text-white text-lg rounded-2xl py-5 pl-14 pr-4 focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent focus:outline-none transition-all shadow-lg placeholder-gray-600 group-hover:border-white/20"
          />
          <div className="absolute right-3 top-3 hidden md:block">
             <span className="text-[10px] text-gray-500 border border-white/10 px-2 py-1 rounded bg-black/20">CTRL + K</span>
          </div>
        </div>

        {/* Chips de Categorías */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="flex items-center gap-2 text-gray-400 text-xs font-bold mr-2 uppercase tracking-widest"><Filter size={14}/> Filtrar:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border backdrop-blur-sm ${
                categoryFilter === cat
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/30 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Título de Sección */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-heading">
          <span className="w-1 h-8 bg-brand-gold rounded-full"></span>
          Catálogo de Piezas
        </h2>
        <span className="text-cyan-400 text-xs font-mono bg-cyan-950/30 px-3 py-1 rounded border border-cyan-500/20">{filteredProducts.length} items encontrados</span>
      </div>

      {/* --- GRID DE PRODUCTOS (GLASSMORPHISM) --- */}
      <div className="max-w-7xl mx-auto pb-10">
        {products.length === 0 ? (
           <div className="text-center py-32"><p className="text-gray-500 animate-pulse">Sincronizando con base de datos...</p></div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative bg-[#1E293B]/40 backdrop-blur-md rounded-3xl border border-white/5 hover:border-brand-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 flex flex-col overflow-hidden">
                
                {/* Badge Flotante */}
                <div className="absolute top-4 left-4 z-10">
                   {product.condition === ProductCondition.NEW && (
                     <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-emerald-500/20">NUEVO</span>
                   )}
                </div>

                {/* Imagen */}
                <div className="relative h-60 p-6 flex items-center justify-center cursor-pointer overflow-hidden" onClick={() => setSelectedProduct(product)}>
                  {/* Gradiente sutil detrás de la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img src={product.imageUrl} alt={product.title} className="object-contain max-h-full max-w-full drop-shadow-xl group-hover:scale-110 transition-transform duration-500 z-10" onError={(e) => {e.currentTarget.src = 'https://via.placeholder.com/150?text=Sin+Imagen'}} />
                </div>

                {/* Contenido */}
                <div className="p-5 flex-1 flex flex-col bg-[#0F172A]/50 border-t border-white/5">
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <h3 className="text-gray-100 font-bold text-lg leading-tight group-hover:text-brand-gold transition-colors line-clamp-2 mb-2">{product.title}</h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.description || "Ver detalles técnicos..."}</p>
                  </div>

                  {/* Precios */}
                  <div className="mt-auto">
                    {isSimpleProduct(product) ? (
                      <div className="flex items-center justify-between group/btn" onClick={() => onAddToCart(product, false)}>
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase font-bold">Precio</span>
                          <span className="text-white font-mono font-bold text-xl">${product.pricePartOnly}</span>
                        </div>
                        <button className="h-10 w-10 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-all shadow-lg text-brand-gold group-hover/btn:scale-110">
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs text-gray-400">
                           <span>Pieza: <strong className="text-white">${product.pricePartOnly}</strong></span>
                        </div>
                        <button onClick={() => onAddToCart(product, true)} className="w-full py-2 bg-gradient-to-r from-brand-gold/80 to-brand-gold text-brand-dark font-bold rounded-lg text-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2">
                           <Zap size={14} fill="black"/> Instalado ${product.priceInstalled}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 mx-auto max-w-lg backdrop-blur-sm">
            <Search className="mx-auto h-16 w-16 text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Sin resultados</h3>
            <p className="text-gray-400">Intenta buscar de otra forma o limpia los filtros.</p>
            <button onClick={() => {setSearchQuery(''); setCategoryFilter('Todo');}} className="mt-6 text-brand-gold font-bold hover:underline">Limpiar todo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;