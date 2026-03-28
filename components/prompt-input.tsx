import { memo, useState } from 'react';
import { MUSIC_PRESETS, type MusicPreset } from '@/types/musicgpt';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  vocalOnly: boolean;
  onVocalOnlyChange: (value: boolean) => void;
  instrumentalOnly: boolean;
  onInstrumentalOnlyChange: (value: boolean) => void;
  selectedPreset: string;
  onPresetChange: (preset: string) => void;
  lyrics: string;
  onLyricsChange: (value: string) => void;
  gender: 'male' | 'female' | 'neutral' | '';
  onGenderChange: (value: 'male' | 'female' | 'neutral' | '') => void;
}

export const PromptInput = memo(function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled,
  vocalOnly,
  onVocalOnlyChange,
  instrumentalOnly,
  onInstrumentalOnlyChange,
  selectedPreset,
  onPresetChange,
  lyrics,
  onLyricsChange,
  gender,
  onGenderChange,
}: PromptInputProps) {
  const maxLength = 280;
  const lyricsMaxLength = 2000;

  const handlePresetChange = (presetId: string) => {
    onPresetChange(presetId);
    const preset = MUSIC_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onChange(preset.prompt);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Music Type Switches */}
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
        <button
          type="button"
          onClick={() => onVocalOnlyChange(!vocalOnly)}
          className={`relative group px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border-2 ${
            vocalOnly
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
              : 'bg-gray-900/60 border-purple-500/30 text-gray-300 hover:border-purple-500/50'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
            Solo Vocal
          </span>
        </button>

        <button
          type="button"
          onClick={() => onInstrumentalOnlyChange(!instrumentalOnly)}
          className={`relative group px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border-2 ${
            instrumentalOnly
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
              : 'bg-gray-900/60 border-purple-500/30 text-gray-300 hover:border-purple-500/50'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            Solo Música
          </span>
        </button>
      </div>

      {/* Lyrics Input */}
      <div className="space-y-2 sm:space-y-3">
        <label htmlFor="lyrics" className="block text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 17h8v-2H8v2zm0-4h8v-2H8v2z" />
          </svg>
          Letra (Opcional)
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <textarea
            id="lyrics"
            value={lyrics}
            onChange={(e) => onLyricsChange(e.target.value)}
            placeholder="Escribe la letra aquí si deseas que la canción incluya voces con letra personalizada..."
            className="relative w-full h-24 sm:h-32 px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/60 border-2 border-purple-500/30 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base text-gray-100 placeholder-gray-500 resize-none transition-all duration-300 focus:border-purple-500/60 focus:shadow-lg focus:shadow-purple-500/20"
            maxLength={lyricsMaxLength}
            disabled={disabled}
          />
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs font-semibold text-gray-500 bg-gray-900/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-purple-500/20">
            {lyrics.length}/{lyricsMaxLength}
          </div>
        </div>
      </div>

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

      {/* Music Style Dropdown */}
      <div className="space-y-2 sm:space-y-3">
        <label className="block text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Estilo Musical
        </label>
        <Select value={selectedPreset} onValueChange={handlePresetChange}>
          <SelectTrigger placeholder="Selecciona un estilo..." />
          <SelectContent>
            {MUSIC_PRESETS.map((preset, index) => (
              <SelectItem key={preset.id} index={index} value={preset.id}>
                {preset.emoji} {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gender Dropdown */}
      <div className="space-y-2 sm:space-y-3">
        <label className="block text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          Género de Voz (Opcional)
        </label>
        <Select value={gender} onValueChange={(value) => onGenderChange(value as 'male' | 'female' | 'neutral' | '')}>
          <SelectTrigger placeholder="Sin preferencia" />
          <SelectContent>
            <SelectItem index={0} value="">Sin preferencia</SelectItem>
            <SelectItem index={1} value="male">Masculino</SelectItem>
            <SelectItem index={2} value="female">Femenino</SelectItem>
            <SelectItem index={3} value="neutral">Neutral</SelectItem>
          </SelectContent>
        </Select>
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
              Sé específico con el género, tempo, instrumentos y ambiente. Usa los presets para comenzar rápidamente y personaliza el prompt a tu gusto.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
});
