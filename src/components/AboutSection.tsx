import React, { useState } from 'react';
import { Terminal, ShieldCheck, GraduationCap, Cpu } from 'lucide-react';

interface AboutSectionProps {
  onOpenLetter: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenLetter }) => {
  const [hoverProgress, setHoverProgress] = useState(50);

  return (
    <section id="about" className="relative py-24 bg-[#050505] text-white border-t border-b border-white/10 overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-[#7e22ce]/10 via-[#b651f0]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker matching original: .aboutme h2 */}
        <div className="mb-8">
          <h2 className="font-poppins text-xs font-semibold tracking-[4px] text-[#b5a27d] uppercase">
            ABOUT ME
          </h2>
        </div>

        {/* Dual-Layer Text Reveal matching original: .main & .text-area */}
        <div
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            setHoverProgress(pct);
          }}
          className="relative cursor-crosshair select-none my-6 group"
        >
          {/* Base Muted Layer */}
          <div className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-[#2c2727] tracking-wider transition-colors duration-300">
            I CRAFT SEAMLESS WEB EXPERIENCES AS A{' '}
            <span className="text-[#581c87]/50">FULLSTACK & FRONTEND DEVELOPER</span>
            , BLENDING CREATIVITY WITH CLEAN CODE FOR MODERN INTERACTIVE SYSTEMS.
          </div>

          {/* Illuminated Interactive Layer (clipped by hover position) */}
          <div
            className="absolute top-0 left-0 w-full font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-white tracking-wider pointer-events-none transition-[clip-path] duration-150"
            style={{
              clipPath: `polygon(0 0, ${hoverProgress}% 0, ${hoverProgress}% 100%, 0 100%)`
            }}
          >
            I CRAFT SEAMLESS WEB EXPERIENCES AS A{' '}
            <span className="text-[#d68aff]">FULLSTACK & FRONTEND DEVELOPER</span>
            , BLENDING CREATIVITY WITH CLEAN CODE FOR MODERN INTERACTIVE SYSTEMS.
          </div>
        </div>

        {/* 3 Pillars / Bio Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#b651f0]/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#b651f0]/10 flex items-center justify-center text-[#b651f0] mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bebas text-2xl tracking-wide text-white mb-2">
              Engineering & Systems
            </h3>
            <p className="font-poppins text-xs text-slate-300 leading-relaxed">
              Specialized in production algorithms (min-heap nearest-slot assignment, interval conflict scheduling, AST lexers) and scalable fullstack architectures using React 19, TypeScript, and modern state stores.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#b651f0]/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#b651f0]/10 flex items-center justify-center text-[#b651f0] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bebas text-2xl tracking-wide text-white">
                Verified Internship
              </h3>
              <button
                onClick={onOpenLetter}
                className="text-[11px] font-mono text-[#d68aff] hover:underline"
              >
                View Letter →
              </button>
            </div>
            <p className="font-poppins text-xs text-slate-300 leading-relaxed">
              Delivered enterprise modules as Fullstack Web Developer at Creatics IT Solutions, signed by CEO Faizan Rais. Recognized for engineering discipline, code quality, and on-time shipment.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#b651f0]/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#b651f0]/10 flex items-center justify-center text-[#b651f0] mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bebas text-2xl tracking-wide text-white mb-2">
              Computer Science Foundation
            </h3>
            <p className="font-poppins text-xs text-slate-300 leading-relaxed">
              Bachelors of Computer Science (In Process) at Sindh Madressatul Islam University (SMIU). Deep foundations in Data Structures, Object-Oriented Programming (Java/Python), and low-level memory in C.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
