import React from 'react';
import { Bell, Calendar, Clock, Battery } from 'lucide-react';

interface ProductSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const ProductSection = ({ scrollToSection }: ProductSectionProps) => {
  return (
    <section id="product" className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
              Conoce RemindWell
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                  <Bell className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Recordatorios Inteligentes</h3>
                  <p className="text-gray-600">Sistema de alertas visuales y sonoras para no olvidar ninguna toma.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                  <Calendar className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Organización Semanal o Mensual</h3>
                  <p className="text-gray-600">Flexibilidad para organizar tus medicamentos según tus necesidades.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                  <Clock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Múltiples Tomas Diarias</h3>
                  <p className="text-gray-600">Compartimentos para cada momento del día, claramente marcados.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                  <Battery className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Larga Duración</h3>
                  <p className="text-gray-600">Batería de larga duración y fácil recarga mediante USB.</p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => scrollToSection('buy')}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Configurar mi RemindWell
                </button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1000"
              alt="RemindWell Features"
              className="rounded-xl shadow-xl w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;