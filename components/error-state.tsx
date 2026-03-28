import { memo } from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = memo(function ErrorState({
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Error Icon */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-50"></div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
          Error
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">{error}</p>
      </div>

      {/* Error Solutions */}
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-300 font-medium mb-2">Soluciones Posibles</p>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Verifica tu conexión a internet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Intenta con un prompt más breve y específico</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Confirma que tu API key sea válida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Inténtalo nuevamente en unos minutos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="group w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-180"
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
        Intentar de Nuevo
      </button>
    </div>
  );
});
