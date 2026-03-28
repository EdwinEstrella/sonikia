import { memo } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

export const PromptInput = memo(function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: PromptInputProps) {
  const maxLength = 280;

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Input Section */}
      <div className="space-y-3 sm:space-y-4">
        <label
          htmlFor="prompt"
          className="block text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-2"
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          Describe tu Música
        </label>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <textarea
            id="prompt"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ej: Un beat lofi chill con piano suave, sonidos de lluvia y vibes de estudio nocturno..."
            className="relative w-full h-32 sm:h-40 lg:h-48 px-4 sm:px-6 py-3 sm:py-5 bg-gray-900/60 border-2 border-purple-500/30 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base text-gray-100 placeholder-gray-500 resize-none transition-all duration-300 focus:border-purple-500/60 focus:shadow-lg focus:shadow-purple-500/20"
            maxLength={maxLength}
            disabled={disabled}
          />
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs font-semibold text-gray-500 bg-gray-900/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-purple-500/20">
            {value.length}/{maxLength}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="group relative w-full py-3 sm:py-4 lg:py-5 px-6 sm:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 active:scale-[0.98] overflow-hidden"
      >
        <span className="relative flex items-center justify-center gap-2 sm:gap-3">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span className="text-sm sm:text-base">Generar Música</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>

      {/* Pro Tips */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-300 font-medium mb-1">Tip Profesional</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Sé específico con el género, tempo, instrumentos y ambiente. Ej: &quot;Hip-hop melódico 90 BPM con piano jazz y drums lofi&quot;
            </p>
          </div>
        </div>
      </div>
    </form>
  );
});
