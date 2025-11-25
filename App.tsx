import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Loader2 } from 'lucide-react';
import { ADDRESS } from './constants';
import WhatsAppButton from './components/WhatsAppButton';
import Services from './components/Services';
import Store from './components/Store';
import Appointment from './components/Appointment';
import Cart from './components/Cart';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import { CartItem, Product } from './types';
import { getProductsFromSheet } from './services/sheet';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'store' | 'terms' | 'privacy'>('home');
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getProductsFromSheet();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addToCart = (product: Product, isInstalled: boolean) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.isInstalled === isInstalled);
      if (existing) {
        return prev.map(item => (item.product.id === product.id && item.isInstalled === isInstalled) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, isInstalled, price: isInstalled ? product.priceInstalled : product.pricePartOnly, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => setCart(prev => prev.filter((_, i) => i !== index));

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cabecera con Logo y Menú
  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
           <img src="/logo.png" alt="ServiSell Plus" className="h-12 w-auto object-contain" />
        </div>

        {/* Menú PC */}
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-200 uppercase tracking-wider">
          <button onClick={() => setCurrentPage('home')} className="hover:text-brand-gold transition-colors">Inicio</button>
          <button onClick={() => scrollTo('services')} className="hover:text-brand-gold transition-colors">Taller</button>
          <button onClick={() => setCurrentPage('store')} className="hover:text-brand-gold transition-colors">Tienda</button>
        </nav>

        {/* Carrito y Menú Móvil */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-white hover:text-brand-gold transition-colors" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>}
          </button>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-dark border-b border-white/10 absolute w-full left-0 top-20 flex flex-col p-4 space-y-4 shadow-2xl z-50">
          <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-left p-2 text-white font-bold hover:bg-white/5 rounded">INICIO</button>
          <button onClick={() => scrollTo('services')} className="text-left p-2 text-white font-bold hover:bg-white/5 rounded">TALLER</button>
          <button onClick={() => { setCurrentPage('store'); setIsMenuOpen(false); }} className="text-left p-2 text-brand-gold font-bold hover:bg-white/5 rounded">TIENDA</button>
        </div>
      )}
    </header>
  );

  return (
    <div className="min-h-screen font-sans bg-brand-dark text-white flex flex-col">
      {renderHeader()}
      
      <main className="flex-1 w-full">
        {currentPage === 'home' ? (
          <>
            <section className="min-h-[70vh] flex items-center justify-center bg-circuit-pattern text-center px-4 relative overflow-hidden">
               <div className="relative z-10 max-w-3xl">
                 <div className="inline-block border border-brand-gold/50 text-brand-gold px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-6">TECNOLOGÍA PROFESIONAL</div>
                 <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">Reparación <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Inteligente</span></h1>
                 <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Servicio técnico avanzado y venta de repuestos originales en Artemisa.</p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => scrollTo('services')} className="bg-white text-brand-dark font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition-all">Ver Servicios</button>
                    <button onClick={() => setCurrentPage('store')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Ir a la Tienda</button>
                 </div>
               </div>
            </section>
            <Services />
            <Appointment />
          </>
        ) : (
          currentPage === 'store' ? (
            loading ? (
              <div className="flex justify-center h-screen items-center text-white gap-3"><Loader2 className="animate-spin text-brand-gold"/> Cargando catálogo...</div>
            ) : (
              <Store products={products} categoryFilter={activeCategory} searchQuery={searchQuery} onAddToCart={addToCart} setCategoryFilter={setActiveCategory} />
            )
          ) : (
            currentPage === 'terms' ? <Terms onBack={() => setCurrentPage('home')} /> : <Privacy onBack={() => setCurrentPage('home')} />
          )
        )}
      </main>

      {/* Footer con enlaces legales */}
      <footer className="bg-black/30 py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm font-medium">
            <button onClick={() => { setCurrentPage('terms'); scrollTo('top'); }} className="text-gray-400 hover:text-brand-gold transition-colors">Términos y Condiciones</button>
            <span className="text-gray-700">|</span>
            <button onClick={() => { setCurrentPage('privacy'); scrollTo('top'); }} className="text-gray-400 hover:text-brand-gold transition-colors">Privacidad</button>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} ServiSell Plus - {ADDRESS}</p>
        </div>
      </footer>
      
      <WhatsAppButton />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} />
    </div>
  );
}

export default App;