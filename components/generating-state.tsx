import { memo } from 'react';

interface GeneratingStateProps {
  progress: number;
  eta: number | null;
  onCancel: () => void;
}

// Pre-calculate equalizer bars with deterministic durations
const EQUALIZER_BARS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  delay: i * 0.05,
  duration: 0.8 + (i % 5) * 0.1, // Deterministic variation based on index
}));

export const GeneratingState = memo(function GeneratingState({
  progress,
  eta,
  onCancel,
}: GeneratingStateProps) {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Animated Equalizer */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 h-16 sm:h-20 lg:h-24">
        {EQUALIZER_BARS.map((bar) => (
          <div
            key={bar.id}
            className="w-1.5 sm:w-2 bg-gradient-to-t from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/30"
            style={{
              animationName: 'equalizer-bar',
              animationDuration: `${bar.duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${bar.delay}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Creando tu Música
        </h2>
        {eta && (
          <p className="text-sm sm:text-base text-gray-400 font-medium">
            Tiempo estimado: {Math.ceil(eta / 60)} min
          </p>
        )}
      </div>

      {/* Progress Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-400">
          <span>Procesando</span>
          <span className="text-purple-400">{progress.toFixed(0)}%</span>
        </div>
        <div className="relative h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Iniciando</span>
          <span>Completando</span>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-300 font-medium truncate">Estado</p>
            <p className="text-xs text-gray-500 truncate">La IA está componiendo tu música única</p>
          </div>
        </div>
      </div>

      <button
        onClick={onCancel}
        className="w-full py-3 sm:py-4 px-4 sm:px-6 border-2 border-gray-700 text-gray-400 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Cancelar
      </button>
    </div>
  );
});
