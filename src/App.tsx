import React, { useState, useEffect } from 'react';
import { Pill, Users, Phone, ShoppingCart, Bell, Calendar, Clock, Battery, X, Minus, Plus } from 'lucide-react';

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = () => {
    const newItem: CartItem = {
      type: pillboxType,
      doses: dosesPerDay,
      light: hasLight,
      quantity: 1,
      price: 29.99 // Base price
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
    setShowAddedFeedback(true);
    setTimeout(() => setShowAddedFeedback(false), 2000);
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
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Pill className="text-blue-600 w-8 h-8" />
              <span className="text-xl font-bold text-gray-800">RemindWell</span>
            </div>
            <div className="flex items-center space-x-8">
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
                onClick={() => setIsCartOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 relative"
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
      </nav>

      {/* Shopping Cart Slide-out */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Carrito</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">El carrito está vacío</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">RemindWell {item.type}</h3>
                        <p className="text-sm text-gray-600">
                          Tomas: {item.doses === 'three-times' ? 'Mañana, mediodía y noche' : item.doses}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.light === 'with-light' ? 'Con luz' : 'Sin luz'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(index, false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, true)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                      <span className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold">{totalPrice.toFixed(2)}€</span>
              </div>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Nunca olvides tomar tus medicamentos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            RemindWell es tu compañero inteligente que te ayuda a mantener un control preciso de tus medicamentos diarios.
          </p>
          <img
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000"
            alt="RemindWell Smart Pill Organizer"
            className="rounded-xl shadow-2xl mx-auto max-w-2xl"
          />
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Conoce RemindWell
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Bell className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Recordatorios Inteligentes</h3>
                    <p className="text-gray-600">Sistema de alertas visuales y sonoras para no olvidar ninguna toma.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Organización Semanal o Mensual</h3>
                    <p className="text-gray-600">Flexibilidad para organizar tus medicamentos según tus necesidades.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Múltiples Tomas Diarias</h3>
                    <p className="text-gray-600">Compartimentos para cada momento del día, claramente marcados.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Battery className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Larga Duración</h3>
                    <p className="text-gray-600">Batería de larga duración y fácil recarga mediante USB.</p>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1000"
              alt="RemindWell Features"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Buy Section */}
      <section id="buy" className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Configura tu RemindWell
          </h2>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Tipo de pastillero</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPillboxType('weekly')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      pillboxType === 'weekly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Semanal
                  </button>
                  <button
                    onClick={() => setPillboxType('monthly')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      pillboxType === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Mensual
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Número de tomas</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setDosesPerDay('morning')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      dosesPerDay === 'morning'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Mañana
                  </button>
                  <button
                    onClick={() => setDosesPerDay('night')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      dosesPerDay === 'night'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Noche
                  </button>
                  <button
                    onClick={() => setDosesPerDay('three-times')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      dosesPerDay === 'three-times'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Mañana, mediodía y noche
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Indicador de luz</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setHasLight('with-light')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      hasLight === 'with-light'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Con luz
                  </button>
                  <button
                    onClick={() => setHasLight('without-light')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      hasLight === 'without-light'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
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
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Sobre Nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
              alt="Our Team"
              className="rounded-xl shadow-xl"
            />
            <div>
              <p className="text-xl text-gray-600 mb-6">
                En RemindWell, nos dedicamos a mejorar la calidad de vida de las personas mayores a través de soluciones tecnológicas simples y efectivas.
              </p>
              <p className="text-xl text-gray-600">
                Nuestro equipo combina experiencia en salud y tecnología para crear productos que realmente marcan la diferencia en la vida diaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Contacto
            </h2>
            <p className="text-xl text-gray-600">
              Estamos aquí para ayudarte
            </p>
          </div>
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Enviar mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;