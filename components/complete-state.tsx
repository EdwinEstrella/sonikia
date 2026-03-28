import { memo } from 'react';

interface CompleteStateProps {
  audioUrl: string;
  audioUrl2: string | null;
  onDownload: () => void;
  onDownload2: () => void;
  onReset: () => void;
  /** Título devuelto por MusicGPT (title_1 / title_2) */
  generatedTitle?: string | null;
  /** Letra V1 (lyrics_1 o lyrics) */
  generatedLyrics?: string | null;
  /** Letra V2 si difiere de V1 */
  generatedLyrics2?: string | null;
  /** Modo solo instrumental: sin bloque de letra esperado */
  instrumentalOnly?: boolean;
}

export const CompleteState = memo(function CompleteState({
  audioUrl,
  audioUrl2,
  onDownload,
  onDownload2,
  onReset,
  generatedTitle,
  generatedLyrics,
  generatedLyrics2,
  instrumentalOnly,
}: CompleteStateProps) {
  const hasLyrics = Boolean(generatedLyrics?.trim() || generatedLyrics2?.trim());

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Success Icon */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
          ¡Música Lista!
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">Tu pista ha sido generada exitosamente</p>
        {generatedTitle?.trim() ? (
          <p className="text-sm sm:text-base text-purple-300 mt-2 font-medium">{generatedTitle.trim()}</p>
        ) : null}
      </div>

      {/* Letra generada (MusicGPT: lyrics_1 / lyrics_2 en GET byId) */}
      <div className="rounded-xl sm:rounded-2xl border border-purple-500/25 bg-gray-900/50 p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wider mb-3">
          Letra
        </h3>
        {hasLyrics ? (
          <div className="space-y-4 max-h-64 sm:max-h-80 overflow-y-auto pr-1">
            {generatedLyrics?.trim() ? (
              <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                {generatedLyrics.trim()}
              </pre>
            ) : null}
            {generatedLyrics2?.trim() ? (
              <div>
                <p className="text-[10px] sm:text-xs text-pink-400/90 font-semibold uppercase mb-2">
                  Versión 2
                </p>
                <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {generatedLyrics2.trim()}
                </pre>
              </div>
            ) : null}
          </div>
        ) : instrumentalOnly ? (
          <p className="text-xs sm:text-sm text-gray-500 italic">
            Pieza instrumental: no se espera letra; si el modelo devolviera texto, aparecería aquí.
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500 italic">
            MusicGPT no incluyó letra en la respuesta (revisa consola / red si persiste).
          </p>
        )}
      </div>

      {/* Audio Player Cards */}
      <div className="space-y-4">
        {/* Version 1 */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-gray-100 truncate">Versión 1</p>
              <p className="text-xs text-gray-500">Generado con IA • Alta Calidad</p>
            </div>
          </div>
          <audio
            src={audioUrl}
            controls
            className="w-full h-8 sm:h-10"
          >
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>

        {/* Version 2 */}
        {audioUrl2 && (
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-500/20">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-gray-100 truncate">Versión 2</p>
                <p className="text-xs text-gray-500">Generado con IA • Alta Calidad</p>
              </div>
            </div>
            <audio
              src={audioUrl2}
              controls
              className="w-full h-8 sm:h-10"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={onDownload}
          className="group py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Descargar V1
        </button>
        {audioUrl2 && (
          <button
            onClick={onDownload2}
            className="group py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:from-pink-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Descargar V2
          </button>
        )}
        <button
          onClick={onReset}
          className={`group py-3 sm:py-4 px-4 sm:px-6 border-2 border-gray-700 text-gray-300 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${!audioUrl2 ? 'sm:col-span-2' : ''}`}
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
          Nueva Canción
        </button>
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-300 font-medium mb-1">¡Éxito!</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tu música ha sido generada y está lista para descargar. Puedes crear tantas canciones como quieras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
