interface MusicHeaderProps {
  isMobile?: boolean;
}

export function MusicHeader({ isMobile = false }: MusicHeaderProps) {
  const logoSize = isMobile ? 'w-16 h-16' : 'w-20 h-20';
  const iconSize = isMobile ? 'w-10 h-10' : 'w-14 h-14';
  const titleSize = isMobile ? 'text-4xl' : 'text-6xl';
  const subtitleSize = isMobile ? 'text-base' : 'text-xl';

  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative">
      {/* Logo */}
      <div className="relative inline-flex items-center justify-center mb-6 sm:mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl blur-xl opacity-50 animate-pulse"></div>
        <div className={`relative ${logoSize} bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500`}>
          <svg
            className={`${iconSize} text-white`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        {/* Sound Waves */}
        <div className="absolute -right-2 sm:-right-4 top-1/2 transform -translate-y-1/2 hidden sm:block">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-purple-500 rounded-full opacity-60"
              style={{
                left: `${i * 8}px`,
                animationName: 'sound-wave',
                animationDuration: '1.2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <h1 className={`${titleSize} font-black mb-3 sm:mb-4 tracking-tight`}>
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
          Sonikia
        </span>
      </h1>

      <p className={`${subtitleSize} text-gray-300 font-light tracking-wide mb-2`}>
        Generación Musical con IA
      </p>

      <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
        <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-purple-500/50"></div>
        <span>Premium Experience</span>
        <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-purple-500/50"></div>
      </div>
    </div>
  );
}
