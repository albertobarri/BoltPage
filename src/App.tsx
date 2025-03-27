import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Pill, Users, Phone, ShoppingCart, Bell, Calendar, Clock, Battery, X, Minus, Plus, Trash2, CreditCard, Menu } from 'lucide-react';

// Lazy load sections
const HomeSection = lazy(() => import('./sections/HomeSection'));
const ProductSection = lazy(() => import('./sections/ProductSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

interface CartItem {
  type: string;
  doses: string;
  light: string;
  quantity: number;
  price: number;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [pillboxType, setPillboxType] = useState('weekly');
  const [dosesPerDay, setDosesPerDay] = useState('morning');
  const [hasLight, setHasLight] = useState('with-light');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const calculateItemPrice = (type: string, doses: string, light: string) => {
    let price = 29.99;
    if (type === 'monthly') price += 10;
    if (doses === 'three-times') price += 5;
    if (light === 'with-light') price += 3;
    return price;
  };

  const addToCart = () => {
    const price = calculateItemPrice(pillboxType, dosesPerDay, hasLight);
    const newItem: CartItem = {
      type: pillboxType,
      doses: dosesPerDay,
      light: hasLight,
      quantity: 1,
      price
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
    setShowAddedFeedback(true);
    setIsCartAnimating(true);
    setTimeout(() => {
      setShowAddedFeedback(false);
      setIsCartAnimating(false);
    }, 2000);
  };

  const updateQuantity = (index: number, increment: boolean) => {
    setCartItems(prev => prev.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    }));
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => {
      const newItems = [...prev];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity z-50"
            >
              <Pill className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-xl font-bold text-gray-800">RemindWell</span>
            </button>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={toggleCart}
                className={`relative p-2 transform transition-transform duration-300 ${
                  isCartAnimating ? 'scale-125' : 'scale-100'
                }`}
              >
                <ShoppingCart size={24} className="text-gray-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 z-50 relative"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-600" />
                ) : (
                  <Menu size={24} className="text-gray-600" />
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-lg font-medium transition-colors ${
                  activeSection === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('product')}
                className={`text-lg font-medium transition-colors ${
                  activeSection === 'product' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                RemindWell
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-lg font-medium transition-colors ${
                  activeSection === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Sobre nosotros
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-lg font-medium transition-colors ${
                  activeSection === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Contacto
              </button>
              <button
                onClick={toggleCart}
                className={`bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all flex items-center space-x-2 relative transform duration-300 ${
                  isCartAnimating ? 'scale-110' : 'scale-100'
                }`}
              >
                <ShoppingCart size={20} />
                <span>Carrito</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20">
            <div className="flex-1 px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'home'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('product')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'product'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                RemindWell
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'about'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Sobre nosotros
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'contact'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Shopping Cart Slide-out */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Tu carrito</h2>
              <p className="text-sm text-gray-500">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</p>
            </div>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Tu carrito está vacío</p>
                <button
                  onClick={() => {
                    toggleCart();
                    scrollToSection('buy');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg transform transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">RemindWell {item.type}</h3>
                        <p className="text-sm text-gray-600">
                          {item.doses === 'three-times' ? 'Mañana, mediodía y noche' :
                           item.doses === 'morning' ? 'Mañana' : 'Noche'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.light === 'with-light' ? 'Con luz' : 'Sin luz'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => updateQuantity(index, false)}
                          className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, true)}
                          className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
                        <p className="text-sm text-gray-500">{item.price.toFixed(2)}€/ud.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCard size={20} />
                <span>Finalizar compra</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleCart}
        />
      )}

      {/* Cart Button Animation */}
      <div
        className={`fixed bottom-8 right-8 transform transition-transform duration-300 ${
          isCartAnimating ? 'scale-125' : 'scale-100'
        } z-50`}
      >
        <button
          onClick={toggleCart}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Main Content */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <HomeSection />
        <ProductSection scrollToSection={scrollToSection} />
        <div id="buy" className="min-h-screen flex items-center justify-center bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">
              Configura tu RemindWell
            </h2>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Tipo de pastillero</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
                    <button
                      onClick={() => setPillboxType('weekly')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        pillboxType === 'weekly'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full sm:w-auto`}
                    >
                      Semanal
                    </button>
                    <button
                      onClick={() => setPillboxType('monthly')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        pillboxType === 'monthly'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full sm:w-auto`}
                    >
                      Mensual
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Número de tomas</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setDosesPerDay('morning')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        dosesPerDay === 'morning'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full`}
                    >
                      Mañana
                    </button>
                    <button
                      onClick={() => setDosesPerDay('night')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        dosesPerDay === 'night'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full`}
                    >
                      Noche
                    </button>
                    <button
                      onClick={() => setDosesPerDay('three-times')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        dosesPerDay === 'three-times'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full`}
                    >
                      Mañana, mediodía y noche
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Indicador de luz</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
                    <button
                      onClick={() => setHasLight('with-light')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        hasLight === 'with-light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full sm:w-auto`}
                    >
                      Con luz
                    </button>
                    <button
                      onClick={() => setHasLight('without-light')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        hasLight === 'without-light'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } w-full sm:w-auto`}
                    >
                      Sin luz
                    </button>
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  className={`w-full relative bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mt-8 ${
                    showAddedFeedback ? 'bg-green-600' : ''
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>{showAddedFeedback ? '¡Añadido!' : 'Añadir al carrito'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <AboutSection />
        <ContactSection />
      </Suspense>
    </div>
  );
}

export default App;