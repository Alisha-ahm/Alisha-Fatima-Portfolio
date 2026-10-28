import React, { useState } from 'react';
import { Menu, X, Play, FileText, Send } from 'lucide-react';

interface NavbarProps {
  onOpenLetter: () => void;
  onOpenReel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLetter, onOpenReel }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects", count: "15" },
    { name: "EDUCATION", href: "#education" },
    { name: "SKILLS", href: "#skills" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#000000]/95 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand identity matching original logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center text-2xl sm:text-3xl font-bebas tracking-wider group">
            <span className="text-white group-hover:text-slate-200 transition-colors">ALISHA</span>
            <span className="text-[#b651f0] ml-1.5 group-hover:text-[#d68aff] transition-colors">FATIMA</span>
          </a>

          {/* Social Icons matching original header */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
            <a
              href="https://www.instagram.com/alisha_ahmed84/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#b651f0] transition-colors p-1"
              title="Instagram: @alisha_ahmed84"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/alisha-ahmed-391440235/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#b651f0] transition-colors p-1"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-box-fill text-lg" />
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (onOpenReel) onOpenReel();
              }}
              className="text-slate-400 hover:text-[#b651f0] transition-colors p-1 flex items-center"
              title="Watch Project Video Demos"
              aria-label="Watch Project Demos"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wider text-[#a0a0a0] hover:text-white transition-colors relative py-1 flex items-center gap-1.5"
            >
              <span>{link.name}</span>
              {link.count && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-[#d68aff]">
                  {link.count}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Actions & Recommendation Letter */}
        <div className="hidden md:flex items-center gap-3">
          {/* Creatics Recommendation Letter */}
          <button
            onClick={onOpenLetter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 transition-all hover:border-[#b651f0]"
            title="View Creatics IT Solutions Recommendation Letter"
          >
            <FileText className="w-3.5 h-3.5 text-[#b651f0]" />
            <span className="tracking-wide">Creatics Letter</span>
          </button>

          {/* Contact Direct CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#b651f0] hover:bg-[#a855f7] text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="tracking-wide">CONTACT</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#b651f0]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-6 bg-[#000000] border-b border-[#b651f0]/30 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bebas tracking-widest text-slate-200 hover:text-[#b651f0] transition-colors"
            >
              {link.name} {link.count ? `(${link.count})` : ''}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLetter();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold bg-white/5 text-purple-300 border border-[#b651f0]/40"
            >
              <FileText className="w-4 h-4 text-[#b651f0]" />
              <span>Creatics Recommendation Letter</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold bg-[#b651f0] text-white"
            >
              <Send className="w-4 h-4" />
              <span>Contact Me (0335-3641052)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
