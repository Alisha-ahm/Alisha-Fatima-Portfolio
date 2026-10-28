import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  Terminal, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  ArrowUp, 
  Flame,
  Award,
  Box
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FloatingTechDockProps {
  onOpenLetter: () => void;
  onOpenLiveApps?: () => void;
}

export const FloatingTechDock: React.FC<FloatingTechDockProps> = ({ onOpenLetter }) => {
  const [celebrated, setCelebrated] = useState(false);

  const handleConfetti = () => {
    setCelebrated(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 }
    });
    setTimeout(() => setCelebrated(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto">
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl bg-[#030712]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 holo-border">
        
        {/* Quick Nav Links */}
        <a
          href="#projects"
          className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors flex items-center gap-1"
          title="Featured Projects"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">Showcase</span>
        </a>

        <a
          href="#services"
          className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors flex items-center gap-1"
          title="Engineering Services"
        >
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">Services</span>
        </a>

        <a
          href="#experience"
          className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors flex items-center gap-1"
          title="Creatics IT Experience"
        >
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden md:inline">Experience</span>
        </a>

        <a
          href="#skills"
          className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors flex items-center gap-1"
          title="Technical Skills"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">Skills</span>
        </a>

        <div className="h-4 w-[1px] bg-slate-800" />

        {/* Letter Trigger */}
        <button
          onClick={onOpenLetter}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-xs font-medium transition-colors flex items-center gap-1"
          title="View Official Creatics Internship Letter"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Letter</span>
        </button>

        {/* Confetti Trigger */}
        <button
          onClick={handleConfetti}
          className="p-1.5 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-amber-950/50 transition-colors"
          title="Launch celebratory confetti"
        >
          <Sparkles className={`w-4 h-4 ${celebrated ? 'animate-spin' : ''}`} />
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
