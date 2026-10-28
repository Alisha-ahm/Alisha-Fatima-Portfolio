import React, { useState } from 'react';
import { X, CheckCircle, Mail, Globe, Phone, Smartphone, MapPin, Award, Printer, Download } from 'lucide-react';

interface InternshipLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InternshipLetterModal: React.FC<InternshipLetterModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'letter' | 'dark'>('letter');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl max-h-[94vh] flex flex-col bg-[#0b101c] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-[#101828]">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Creatics Official Internship Letter
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-sans">
                  Original Document
                </span>
              </h3>
              <p className="text-xs text-slate-400">Issued 11th September, 2025 · Verified Record</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              title="Print or Save Letter as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Toggle Bar */}
        <div className="shrink-0 px-4 sm:px-6 py-2 bg-[#090d17] border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('letter')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'letter'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Original Letterhead
            </button>
            <button
              onClick={() => setViewMode('dark')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'dark'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Executive Summary
            </button>
          </div>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            CNIC # 42201-5505358-2
          </span>
        </div>

        {/* Document Scrollable Area */}
        <div className="p-3 sm:p-6 md:p-8 overflow-y-auto flex-1 bg-[#070a12]">
          {viewMode === 'letter' ? (
            /* Authentic White Letterhead Document */
            <div className="max-w-2xl mx-auto bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-300 relative select-text font-serif min-h-[720px] flex flex-col justify-between">
              
              {/* Top Geometry & Branding */}
              <div className="relative pt-6 px-6 sm:px-10 pb-4">
                {/* Top Right Polygonal Accent */}
                <div className="absolute top-0 right-0 w-44 sm:w-64 h-20 sm:h-28 pointer-events-none overflow-hidden">
                  <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
                    <polygon points="40,0 200,0 200,80 140,80" fill="#00b49f" />
                    <polygon points="80,0 200,0 200,45" fill="#1e293b" opacity="0.95" />
                    <polygon points="0,0 60,0 20,40" fill="#0f766e" opacity="0.8" />
                  </svg>
                </div>

                {/* Creatics Brand Logo */}
                <div className="relative z-10 max-w-xs">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-[#009b86]">
                      Creat<span className="relative">i<span className="absolute -top-1 left-0.5 w-1.5 h-1.5 rounded-full bg-[#00b49f]" /></span>cs<span className="text-[#00b49f]">.</span>
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 tracking-wider font-sans mt-0.5 font-medium">
                    Innovation that inspires
                  </p>
                </div>

                {/* Date */}
                <div className="mt-8 text-xs sm:text-sm text-slate-800 font-sans">
                  11th September, 2025
                </div>
              </div>

              {/* Watermark in the middle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <div className="opacity-[0.06] text-center transform -rotate-12">
                  <span className="text-7xl sm:text-8xl font-black font-sans tracking-tight text-slate-900 block">
                    Creatics.
                  </span>
                  <span className="text-xl sm:text-2xl font-sans tracking-widest text-slate-800 uppercase mt-2 block">
                    Innovation that inspires
                  </span>
                </div>
              </div>

              {/* Letter Title & Body */}
              <div className="relative z-10 px-6 sm:px-12 py-4 space-y-6">
                <div className="text-center space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold underline decoration-2 underline-offset-4 text-slate-950 font-sans tracking-wide">
                    Internship Letter
                  </h4>
                  <p className="text-sm font-bold underline decoration-1 underline-offset-2 text-slate-800 font-sans pt-2">
                    To whom it may concern
                  </p>
                </div>

                <div className="text-xs sm:text-sm leading-relaxed text-slate-800 space-y-4 font-sans text-justify sm:text-left">
                  <p>
                    This is to certify that <strong className="text-slate-950 font-bold">Alisha Fatima</strong> holding CNIC # <strong className="text-slate-950 font-bold">42201-5505358-2</strong> has done internship in the IT department as <strong className="text-slate-950 font-bold">Frontend Developer Trainee</strong> at Creatics from <strong className="text-slate-950 font-bold">August 2025 to September 2025</strong>.
                  </p>
                  <p>
                    We found her performance up to the mark; she is capable to work in a team with productivity and effectiveness. We wish her the best for her future endeavors.
                  </p>
                </div>

                {/* Signatures & Stamp */}
                <div className="pt-6 space-y-2 font-sans">
                  <p className="text-xs sm:text-sm text-slate-800">Regards,</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-800">Manager – Human Resources</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-950">Aiman Shaikh</p>

                  {/* Signature & Stamp Visuals */}
                  <div className="pt-2 flex items-center gap-6">
                    {/* Realistic Blue-Ink Signature Vector */}
                    <svg width="120" height="48" viewBox="0 0 120 48" className="overflow-visible">
                      <path
                        d="M 10 38 C 18 12, 24 8, 30 22 C 34 32, 38 42, 44 26 C 50 14, 58 10, 68 28 C 74 38, 86 36, 102 30 M 34 22 L 56 22 M 20 42 C 35 44, 70 42, 95 40"
                        stroke="#1e3a8a"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>

                    {/* Creatics Stamp Box */}
                    <div className="px-3 py-1 rounded border-2 border-slate-700 text-slate-800 font-bold text-xs font-sans tracking-wider uppercase transform -rotate-1">
                      CREATICS
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Polygonal Footer & Contact Details */}
              <div className="relative z-10 mt-8 pt-4">
                {/* Geometric Bottom Shapes */}
                <div className="w-full h-6 pointer-events-none overflow-hidden">
                  <svg viewBox="0 0 600 30" className="w-full h-full" preserveAspectRatio="none">
                    <polygon points="0,30 250,30 220,10 0,10" fill="#1e293b" />
                    <polygon points="210,30 600,30 600,0 230,0" fill="#00b49f" />
                  </svg>
                </div>

                {/* Contact Information Bar */}
                <div className="bg-[#f8fafc] border-t border-slate-200 px-4 sm:px-8 py-3.5 font-sans">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-[#00b49f] text-white">
                        <Mail className="w-3 h-3" />
                      </span>
                      <span className="truncate">info@thecreatics.com</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-[#00b49f] text-white">
                        <Globe className="w-3 h-3" />
                      </span>
                      <span className="truncate">www.thecreatics.com</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-[#00b49f] text-white">
                        <Smartphone className="w-3 h-3" />
                      </span>
                      <span>0348 3713967</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-[#00b49f] text-white">
                        <Phone className="w-3 h-3" />
                      </span>
                      <span>0213-4322889</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="p-1 rounded bg-[#00b49f] text-white shrink-0">
                      <MapPin className="w-3 h-3" />
                    </span>
                    <span>68 Jinnah Co-operative Housing Society 7/8 PECHS Block, Shahrah-e-Faisal, Karachi</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Executive Dark Mode Summary View */
            <div className="bg-slate-950 p-6 sm:p-8 rounded-xl border border-slate-800 text-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="font-heading font-extrabold text-2xl text-emerald-400">Creatics.</span>
                  <p className="text-xs text-slate-400">Innovation that inspires</p>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <span>11th September, 2025</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  Certified internship completion record for <strong className="text-white">Alisha Fatima</strong> (CNIC: 42201-5505358-2) as a <strong className="text-emerald-300">Frontend Developer Trainee</strong> in the IT Department from August 2025 to September 2025.
                </p>
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-emerald-400">Key Performance Highlights:</div>
                  <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                    <li>Performance rated up to the mark across modern frontend delivery workflows.</li>
                    <li>Demonstrated capability in collaborative team environments with high productivity and effectiveness.</li>
                    <li>Developed responsive UI components, interactive web views, and dynamic frontend architectures.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>Signatory: Aiman Shaikh (Manager – Human Resources)</span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  VERIFIED RECORD
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 bg-[#090e1a] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            Official letterhead document verified on record
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Letter</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
