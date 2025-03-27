import React from 'react';
import { Bell, Calendar, Clock, Battery } from 'lucide-react';

interface ProductSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const ProductSection = ({ scrollToSection }: ProductSectionProps) => {
  return (
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
              <div className="flex justify-center">
                <button
                  onClick={() => scrollToSection('buy')}
                  className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Configurar mi RemindWell
                </button>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1000"
            alt="RemindWell Features"
            className="rounded-xl shadow-xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;