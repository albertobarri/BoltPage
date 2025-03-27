import React from 'react';

const HomeSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
          Nunca olvides tomar tus medicamentos
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          RemindWell es tu compañero inteligente que te ayuda a mantener un control preciso de tus medicamentos diarios.
        </p>
        <div className="px-4 sm:px-8">
          <img
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000"
            alt="RemindWell Smart Pill Organizer"
            className="rounded-xl shadow-2xl mx-auto max-w-full sm:max-w-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;