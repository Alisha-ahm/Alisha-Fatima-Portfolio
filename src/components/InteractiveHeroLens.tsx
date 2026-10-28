import React, { useRef, useState, useEffect } from 'react';
import { LightPurple3DBackground } from './LightPurple3DBackground';

const REEL_VIDEOS = [
  {
    name: "Significo Creative Reel",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789157989/significo_iv5ol6.mp4"
  },
  {
    name: "Fanta 3D Web Experience",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158196/fanta_kdkchv.mp4"
  },
  {
    name: "Gym Dynamic Fitness",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158374/gym_dnlg52.mp4"
  },
  {
    name: "Compiler Rule Logic",
    url: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158423/compiler_s8dvxg.mp4"
  }
];

export const InteractiveHeroLens: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [mouseNormalized, setMouseNormalized] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  // Play ambient background video quietly in loop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });
    setMouseNormalized({
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setLensPos({ x, y });
    setMouseNormalized({
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => {
        setIsInside(false);
        setMouseNormalized({ x: 0, y: 0 });
      }}
      onTouchStart={() => setIsInside(true)}
      className="relative w-full py-16 sm:py-20 select-none overflow-hidden cursor-crosshair group flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] rounded-3xl border border-white/10 bg-[#000000] shadow-2xl"
    >
      {/* Lightest Purple 3D Interactive WebGL Background */}
      <LightPurple3DBackground mouseNormalized={mouseNormalized} />

      {/* Subtle Ambient Video from previous version (low opacity ~18%, non-intrusive) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-20 opacity-20 transition-opacity duration-1000 pointer-events-none"
      >
        <source src={REEL_VIDEOS[0].url} type="video/mp4" />
        <source src="./videos/section.mp4" type="video/mp4" />
      </video>

      {/* Subtle dark tint to preserve contrast */}
      <div className="absolute inset-0 bg-black/40 -z-15 pointer-events-none" />

      {/* Base Text Layer: MAKING GOOD SHIT SINCE 2021 (Clean Slate/Gray matching Image 2) */}
      <h1 className="font-bebas text-center leading-[0.82] tracking-widest text-zinc-400 text-6xl sm:text-7xl md:text-8xl lg:text-9xl transition-colors duration-300 select-none z-10">
        MAKING <br />
        GOOD SHIT <br />
        SINCE 2021
      </h1>

      {/* Overlay Text Layer: HIDING BAD SHIT SINCE 2021 inside Purple Circular Lens (matching Image 2) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-[clip-path] duration-75 z-20"
        style={{
          clipPath: isInside
            ? `circle(125px at ${lensPos.x}px ${lensPos.y}px)`
            : `circle(95px at 50% 50%)`,
          WebkitClipPath: isInside
            ? `circle(125px at ${lensPos.x}px ${lensPos.y}px)`
            : `circle(95px at 50% 50%)`,
          backgroundColor: '#581c87', // Rich purple disc matching Image 2
          boxShadow: '0 0 60px rgba(182, 81, 240, 0.5)'
        }}
      >
        <h1 className="font-bebas text-center leading-[0.82] tracking-widest text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          HIDING <br />
          BAD SHIT <br />
          SINCE 2021
        </h1>
      </div>
    </div>
  );
};
