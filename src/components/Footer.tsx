import React from 'react';
import { ArrowUp, Heart, Mail, MapPin, FileText, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onOpenLetter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLetter }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 py-16 text-slate-400 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Editorial Signoff Banner */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="font-poppins text-xs font-semibold tracking-[4px] text-[#b5a27d] uppercase block mb-2">
              PORTFOLIO ARCHIVE · 2021 — PRESENT
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-wider">
              ALISHA FATIMA NASIR
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
              Fullstack Web & Interactive Systems Developer · Karachi, Pakistan
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bebas text-lg tracking-wider transition-all hover:border-[#b651f0]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#b651f0]" />
            <span>RETURN TO TOP</span>
          </button>
        </div>

        {/* Links & Channels */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 font-bebas text-lg tracking-wider text-slate-300">
            <a href="#about" className="hover:text-[#b651f0] transition-colors">ABOUT</a>
            <a href="#projects" className="hover:text-[#b651f0] transition-colors">PROJECTS (15)</a>
            <a href="#education" className="hover:text-[#b651f0] transition-colors">EDUCATION</a>
            <a href="#skills" className="hover:text-[#b651f0] transition-colors">SKILLS</a>
            <a href="#experience" className="hover:text-[#b651f0] transition-colors">EXPERIENCE</a>
            <button onClick={onOpenLetter} className="hover:text-[#d68aff] transition-colors flex items-center gap-1">
              <span>CREATICS LETTER</span>
            </button>
            <a href="#contact" className="hover:text-[#b651f0] transition-colors">CONTACT</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://www.instagram.com/alisha_ahmed84/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b651f0] transition-colors"
              title="Instagram"
            >
              <i className="ri-instagram-line text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/alisha-ahmed-391440235/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b651f0] transition-colors"
              title="LinkedIn"
            >
              <i className="ri-linkedin-box-fill text-xl" />
            </a>
            <a
              href="mailto:alishaahmed502@gmail.com"
              className="hover:text-[#b651f0] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} Alisha Fatima Nasir.
          </div>
          <div className="text-slate-500">
            Karachi, Pakistan
          </div>
        </div>

      </div>
    </footer>
  );
};
