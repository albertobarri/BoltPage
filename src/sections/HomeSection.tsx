import React from 'react';

const HomeSection = () => {
  return (
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
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default HomeSection;