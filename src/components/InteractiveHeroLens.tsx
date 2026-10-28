import React, { useRef, useState, useEffect, useCallback } from 'react';
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

// Lerp helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const InteractiveHeroLens: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lensOverlayRef = useRef<HTMLDivElement>(null);
  const [mouseNormalized, setMouseNormalized] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  // Refs for RAF loop — no re-renders on mouse move
  const targetPos = useRef({ x: 0, y: 0 });   // where cursor actually is
  const currentPos = useRef({ x: 0, y: 0 });  // where lens currently is (lerped)
  const insideRef = useRef(false);
  const rafId = useRef<number>(0);

  // Play ambient background video quietly in loop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // RAF smooth lens loop — runs independently of React renders
  useEffect(() => {
    const EASE = 0.08; // 0 = no movement, 1 = instant — 0.08 = silky smooth

    const tick = () => {
      rafId.current = requestAnimationFrame(tick);

      if (!lensOverlayRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const inside = insideRef.current;

      // Lerp current toward target
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, EASE);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, EASE);

      const cx = currentPos.current.x;
      const cy = currentPos.current.y;

      // Lens radius: shrinks when outside, grows when inside
      const radius = inside ? 130 : 90;
      const atX = inside ? cx : rect.width / 2;
      const atY = inside ? cy : rect.height / 2;

      const clip = `circle(${radius}px at ${atX}px ${atY}px)`;
      lensOverlayRef.current.style.clipPath = clip;
      lensOverlayRef.current.style.webkitClipPath = clip;
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update target (no setState = no re-render)
    targetPos.current = { x, y };

    // Only update WebGL parallax via state (throttled naturally by React)
    setMouseNormalized({
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    targetPos.current = { x, y };
  }, []);

  const handleMouseEnter = useCallback(() => {
    insideRef.current = true;
    setIsInside(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    insideRef.current = false;
    setIsInside(false);
    setMouseNormalized({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      className="relative w-full py-16 sm:py-20 select-none overflow-hidden cursor-crosshair group flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] rounded-3xl border border-white/10 bg-transparent shadow-2xl"
    >
      {/* Solid dark base */}
      <div className="absolute inset-0 bg-[#050008] rounded-3xl -z-30 pointer-events-none" />

      {/* Lightest Purple 3D Interactive WebGL Background */}
      <LightPurple3DBackground
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        mouseNormalized={mouseNormalized}
      />

      {/* Purple Technology Background Video — full section coverage */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 10,
          opacity: 0.5,
          transition: 'opacity 1s ease',
        }}
      >
        <source src={`${import.meta.env.BASE_URL}purple-tech-bg.mp4`} type="video/mp4" />
        <source src={REEL_VIDEOS[0].url} type="video/mp4" />
      </video>

      {/* Dark overlay to keep text sharp over the video */}
      <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />

      {/* Base Text Layer: MAKING GOOD SHIT SINCE 2021 */}
      <h1 className="font-bebas text-center leading-[0.82] tracking-widest text-zinc-300 text-6xl sm:text-7xl md:text-8xl lg:text-9xl select-none z-30">
        MAKING <br />
        GOOD SHIT <br />
        SINCE 2021
      </h1>

      {/* Overlay Text Layer with smooth RAF-driven lens — no CSS transition needed */}
      <div
        ref={lensOverlayRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
        style={{
          backgroundColor: '#581c87',
          boxShadow: '0 0 80px rgba(182, 81, 240, 0.6)',
          willChange: 'clip-path',
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
