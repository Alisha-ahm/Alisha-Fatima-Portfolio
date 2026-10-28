import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Play, FileText, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { InteractiveHeroLens } from './InteractiveHeroLens';

interface HeroProps {
  onOpenLetter: () => void;
  onOpenVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLetter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-between overflow-hidden bg-[#000000] px-4 sm:px-6 lg:px-8 pt-8 pb-16"
    >
      {/* Dynamic Ambient Background Glows */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -z-10 blur-[140px] opacity-25 transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, #b651f0 0%, #7e22ce 50%, transparent 70%)',
          transform: `translate(${mousePos.x - 50}px, ${mousePos.y - 50}px)`,
          left: '25%',
          top: '20%'
        }}
      />

      {/* Top Status & Location Badge */}
      <div className="z-10 flex flex-wrap items-center justify-center gap-3 mt-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#b651f0] animate-pulse" />
          <span className="font-semibold text-white tracking-wide">Available for Fullstack & Frontend Roles</span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#b651f0]" />
            Karachi, Pakistan
          </span>
        </div>
      </div>

      {/* Centerpiece: The Iconic Dual-Layer Spotlight Lens Typography from Original Portfolio */}
      <div className="w-full max-w-5xl my-auto py-8">
        <InteractiveHeroLens />

        {/* Subtitle statement */}
        <p className="mt-8 text-center text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-poppins font-light leading-relaxed">
          I craft seamless web experiences as a{' '}
          <span className="text-white font-medium border-b border-[#b651f0] pb-0.5">
            Fullstack & Interactive Systems Developer
          </span>
          , blending engineering precision with clean code for modern production interfaces.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#b651f0] hover:bg-[#a855f7] text-white font-bebas text-xl tracking-wider transition-transform hover:scale-[1.03] shadow-lg shadow-purple-900/40"
          >
            <span>EXPLORE 15 PROJECTS</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>

          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bebas text-xl tracking-wider border border-white/15 transition-all hover:border-[#b651f0]"
          >
            <Play className="w-4 h-4 text-[#b651f0] fill-current" />
            <span>WATCH 6 VIDEO DEMOS</span>
          </a>

          <button
            onClick={onOpenLetter}
            className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 font-bebas text-xl tracking-wider border border-white/15 transition-all hover:border-[#b651f0]"
          >
            <FileText className="w-4 h-4 text-[#b651f0]" />
            <span>CREATICS RECOMMENDATION</span>
          </button>
        </div>
      </div>

      {/* Flagship Production Systems Direct Showcase Banner */}
      <div className="w-full max-w-5xl z-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0c]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b651f0]" />
              <span className="font-bebas text-xl tracking-wider text-white">
                FLAGSHIP LIVE PRODUCTION APPS (DEPLOYED & ACTIVE)
              </span>
            </div>
            <span className="text-xs font-mono text-[#b651f0] tracking-wide">
              2 LIVE NETLIFY DEPLOYMENTS · 6 VIDEO DEMOS · 15 REPOSITORIES
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* ParkSense Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-[#b651f0]/60 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#b651f0]">
                    01 · SMART PARKING SYSTEM
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                    LIVE PRODUCTION
                  </span>
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-white group-hover:text-[#d68aff] transition-colors">
                  ParkSense: Smart Parking Management
                </h3>
                <p className="text-xs text-slate-300 font-poppins mt-1 leading-relaxed">
                  3-Floor live slot grid, min-heap nearest slot allocation, interval overlap conflict detection, dynamic surge pricing, and live canvas charts.
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400">
                  Vanilla JS · LocalStorage DB
                </span>
                <a
                  href="https://park-sense-2026.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#b651f0] hover:bg-[#a855f7] px-3 py-1.5 rounded transition-all"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Smart Office Desk Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-[#b651f0]/60 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#b651f0]">
                    02 · INTELLIGENT WORKSPACE
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                    LIVE PRODUCTION
                  </span>
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-white group-hover:text-[#d68aff] transition-colors">
                  Smart Office Desk: Multi-Zone Workspace
                </h3>
                <p className="text-xs text-slate-300 font-poppins mt-1 leading-relaxed">
                  Real-time occupancy management, multi-zone desk booking, dynamic environment sensors, and live telemetry reports.
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400">
                  Netlify Active · Web Engine
                </span>
                <a
                  href="https://smartofficedesk.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#b651f0] hover:bg-[#a855f7] px-3 py-1.5 rounded transition-all"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
