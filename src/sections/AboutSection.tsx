import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">
          Sobre Nosotros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
              alt="Our Team"
              className="rounded-xl shadow-xl w-full"
              loading="lazy"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              En RemindWell, nos dedicamos a mejorar la calidad de vida de las personas mayores a través de soluciones tecnológicas simples y efectivas.
            </p>
            <p className="text-lg sm:text-xl text-gray-600">
              Nuestro equipo combina experiencia en salud y tecnología para crear productos que realmente marcan la diferencia en la vida diaria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;