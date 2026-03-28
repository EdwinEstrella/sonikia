import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { MusicNote, Star } from '@mui/icons-material';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Sonikia transformó mi flujo de producción musical. Crear beats personalizados en minutos me ahorra horas de trabajo en estudio.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "María González",
    role: "Productora Musical",
  },
  {
    text: "La calidad del audio es impresionante. Uso las pistas generadas para mis videos de TikTok y YouTube, siempre suenan profesionales.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Carlos Rodríguez",
    role: "Creador de Contenido",
  },
  {
    text: "Como podcaster, necesitaba música de fondo rápidamente. Sonikia me da pistas originales sin preocuparme por derechos de autor.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ana Martínez",
    role: "Podcaster",
  },
  {
    text: "La IA captura exactamente el estilo que busco. Trap, reggaetón, pop - siempre obtengo resultados únicos y creativos.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Miguel Ángel",
    role: "Artista Independiente",
  },
  {
    text: "Increíble herramienta para mis proyectos de video. Generar música personalizada sin copyright cambió completamente mi workflow.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Laura Sánchez",
    role: "Editora de Video",
  },
  {
    text: "La doble versión es genial. Poder elegir entre dos variaciones de la misma idea me da más opciones creativas para mis canciones.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "David Torres",
    role: "Compositor",
  },
  {
    text: "Sin límites, sin suscripciones costosas. Solo creo música sin restricciones. Esto es libertad creativa real.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sofia Ramírez",
    role: "DJ y Productora",
  },
  {
    text: "La calidad studio-ready es increíble. Las pistas suenan profesionales y están listas para usar inmediatamente en cualquier proyecto.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Javier López",
    role: "Ingeniero de Audio",
  },
  {
    text: "Desde que descubrí Sonikia, mi proceso creativo es 10x más rápido. Generar, probar, y usar música nunca fue tan fácil.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Elena Castro",
    role: "Cantautora",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                  }}
                  whileFocus={{
                    scale: 1.02,
                    y: -4,
                  }}
                  className="p-6 rounded-2xl border border-purple-500/20 bg-gray-800/60 backdrop-blur-xl max-w-xs w-full hover:border-purple-500/40 hover:bg-gray-800/80 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  <blockquote className="m-0 p-0">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed font-normal m-0 transition-colors duration-300">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-3 mt-4">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500/30 group-hover:ring-purple-500/50 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-purple-400 mt-0.5 transition-colors duration-300 flex items-center gap-1">
                          <MusicNote className="w-3 h-3" />
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-purple-500/30 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-purple-300 bg-purple-500/10 backdrop-blur-sm transition-colors">
              Testimonios
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-white">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-center mt-5 text-gray-400 text-lg leading-relaxed max-w-sm transition-colors">
            Descubre cómo miles de creadores están transformando su música con Sonikia.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={30} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function TestimonialV2() {
  return (
    <div className="w-screen relative selection:bg-purple-500 selection:text-white">
      <TestimonialsSection />
    </div>
  );
}
