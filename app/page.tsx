'use client';

import MusicGenerator from '@/components/music-generator';

// Generate random values once outside render
const WAVEFORM_COUNT = 50;
const PARTICLE_COUNT = 15;

const waveforms = Array.from({ length: WAVEFORM_COUNT }, (_, i) => ({
  id: i,
  left: 2 + i * 2,
  height: 20 + Math.sin(i * 0.3) * 30,
  duration: 1.5 + Math.random() * 0.5,
  delay: i * 0.05,
}));

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 10,
}));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-purple-950/30 to-pink-950/20"></div>

      {/* Audio Waveform Background */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute inset-0 flex items-center justify-center">
          {waveforms.map((wave) => (
            <div
              key={wave.id}
              className="absolute w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
              style={{
                left: `${wave.left}%`,
                height: `${wave.height}%`,
                animationName: 'equalizer',
                animationDuration: `${wave.duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${wave.delay}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationName: 'float',
              animationDuration: `${particle.duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Gradient Mesh */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-pink-600 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <main className="relative w-full max-w-7xl px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24 z-10">
        <MusicGenerator />
      </main>

      {/* Professional Footer */}
      <footer className="relative w-full text-center py-6 sm:py-8 z-10 border-t border-white/10">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px sm:w-8 bg-gradient-to-r from-transparent to-purple-500"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-6 h-px sm:w-8 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">
            Hecho por <span className="text-purple-400 font-medium">Edwin Estrella</span>
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 font-light tracking-wider uppercase">
            Premium AI Music Experience
          </p>
        </div>
      </footer>
    </div>
  );
}
