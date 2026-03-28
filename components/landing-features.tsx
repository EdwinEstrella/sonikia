'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🎵',
    title: 'Generación Ilimitada',
    description: 'Crea toda la música que quieras sin restricciones ni límites mensuales.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '⚡',
    title: 'Ultra Rápido',
    description: 'Obtén tus pistas en menos de 2 minutos con nuestra IA optimizada.',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    icon: '🎯',
    title: 'Doble Versión',
    description: 'Recibe 2 versiones únicas de cada canción para elegir tu favorita.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🎨',
    title: 'Estilos Infinitos',
    description: 'Trap, Reggaetón, Rock, Pop, Jazz y más. Personaliza cada detalle.',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    icon: '📝',
    title: 'Letras Personalizadas',
    description: 'Añade tus propias letras o deja que la IA cree por ti.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '💎',
    title: 'Calidad Premium',
    description: 'Audio de alta calidad listo para usar en tus proyectos.',
    gradient: 'from-pink-500 to-purple-500',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Características
            </span>
            <span className="block text-white mt-2">Premium</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Todo lo que necesitas para crear música profesional con inteligencia artificial
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                {/* Glow Effect */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
