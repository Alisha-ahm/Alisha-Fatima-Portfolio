import React from 'react';
import { experienceData } from '../data/portfolioData';
import { GraduationCap, BookOpen, School, Building2, MapPin, CheckCircle2, FileText, Award } from 'lucide-react';

interface ExperienceSectionProps {
  onOpenLetter: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenLetter }) => {
  const educationItems = [
    {
      period: "2023 - In Process",
      degree: "Bachelors of Computer Science",
      institution: "Sindh Madressatul Islam University (SMIU)",
      location: "Karachi, Pakistan",
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      accentBorder: "border-l-4 border-[#ff9f1c]",
      accentText: "text-[#ff9f1c]",
      notes: "Active GDSC member & 4th SMIU Summit delegate. Core focus on Algorithms, Data Structures, and Software Engineering."
    },
    {
      period: "2021 - 2022",
      degree: "Intermediate of Computer Science",
      institution: "Govt. College for Women, Shahrah-e-Liaquat",
      location: "Karachi, Pakistan",
      icon: <BookOpen className="w-5 h-5 text-rose-400" />,
      accentBorder: "border-l-4 border-[#e74c3c]",
      accentText: "text-[#e74c3c]",
      notes: "Advanced Mathematics, Analytical Sciences, and Systems Fundamentals with exceptional standing."
    },
    {
      period: "2019 - 2020",
      degree: "Matriculation of Computer Science",
      institution: "Pak Grammar School",
      location: "Karachi, Pakistan",
      icon: <School className="w-5 h-5 text-blue-400" />,
      accentBorder: "border-l-4 border-[#2980b9]",
      accentText: "text-[#2980b9]",
      notes: "Graduated with High Academic Distinction in Science, Logic & Mathematics."
    }
  ];

  return (
    <section id="education" className="py-24 bg-[#000000] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7e22ce]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EDUCATION Heading matching original: .education h4 */}
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-[#b651f0] tracking-widest uppercase drop-shadow-[0_0_35px_rgba(182,81,240,0.35)]">
            EDUCATION
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Academic computer science progression from foundational mathematics to distributed systems.
          </p>
        </div>

        {/* Vertical Glowing Timeline matching original: .timeline */}
        <div className="relative mb-28">
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff7ef5] via-[#a855f7] to-[#2575fc] -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.7)]" />

          <div className="space-y-12 md:space-y-16">
            {educationItems.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Floating Center Icon */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-11 h-11 rounded-full bg-[#1e1e1e] border-2 border-white/20 items-center justify-center shadow-lg z-20 transition-transform duration-300 hover:scale-125">
                    {item.icon}
                  </div>

                  {/* Timeline Card */}
                  <div
                    className={`w-full md:w-[45%] p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 ${item.accentBorder} shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(182,81,240,0.2)]`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`font-mono text-sm font-bold ${item.accentText}`}>
                        {item.period}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.location}
                      </span>
                    </div>

                    <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white">
                      {item.degree}
                    </h3>

                    <p className="font-poppins font-semibold text-sm text-slate-200 mt-1">
                      {item.institution}
                    </p>

                    <p className="font-poppins text-xs text-slate-300 mt-3 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WORK EXPERIENCE: Creatics IT Solutions with Original Recommendation Letter */}
        <div id="experience" className="pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-5xl sm:text-6xl text-[#b651f0] tracking-widest uppercase">
              WORK EXPERIENCE
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-slate-400 mt-1">
              Production engineering at Creatics Information Technology Company
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md relative overflow-hidden">
            {/* Top gradient highlight */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#b651f0] via-[#ff7ef5] to-[#2575fc]" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#b651f0]/20 text-[#d68aff] border border-[#b651f0]/40">
                    {experienceData.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    August 2025 – September 2025
                  </span>
                </div>

                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                  {experienceData.role}
                </h3>

                <div className="flex items-center gap-2 text-sm text-[#d68aff] font-medium mt-1">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>{experienceData.company}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 font-sans">{experienceData.location}</span>
                </div>
              </div>

              {/* View Recommendation Letter Button */}
              <button
                onClick={onOpenLetter}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#b651f0] hover:bg-[#a855f7] text-white shadow-lg shadow-purple-950/50 transition-all hover:scale-105"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW VERIFIED RECOMMENDATION LETTER</span>
              </button>
            </div>

            <p className="font-poppins text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {experienceData.description}
            </p>

            {/* Key Deliverables */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {experienceData.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-poppins">
                  <CheckCircle2 className="w-4 h-4 text-[#b651f0] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <span className="text-slate-500 font-bold">Tech Stack:</span>
              {experienceData.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
