import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    // Quick progress counter animation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        // Accelerate towards end
        const jump = Math.floor(Math.random() * 15) + 5;
        return Math.min(100, prev + jump);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Staggered Gutter Bars */}
      <div className="absolute inset-0 flex pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex-1 h-full relative border-r border-[#7e22ce]/20">
            <div
              className="absolute top-0 left-0 w-full bg-[#7e22ce] transition-all duration-300 ease-out"
              style={{
                height: `${Math.min(100, Math.max(0, percent - i * 8))}%`
              }}
            />
          </div>
        ))}
      </div>

      {/* Center Branding Name */}
      <div className="relative z-10 flex items-center gap-3">
        <span className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-widest text-[#b651f0] uppercase select-none drop-shadow-[0_0_35px_rgba(182,81,240,0.5)]">
          ALISHA FATIMA
        </span>
        <span className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#b651f0] animate-pulse">
          •
        </span>
      </div>

      {/* Loading Percentage in Bottom Right */}
      <div className="absolute bottom-6 right-8 z-10 font-bebas text-4xl sm:text-6xl text-slate-400 tabular-nums">
        {percent}%
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsFading(true);
          setTimeout(onComplete, 200);
        }}
        className="absolute bottom-7 left-8 z-10 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
      >
        [Skip Intro]
      </button>
    </div>
  );
};
