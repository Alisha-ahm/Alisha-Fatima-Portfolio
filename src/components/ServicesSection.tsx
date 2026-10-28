import React, { useState } from 'react';
import { servicesData } from '../data/portfolioData';
import { Layout, Cpu, Radio, Cloud, Terminal, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(servicesData[0].id);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-fuchsia-400" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-blue-400" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-amber-400" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-emerald-400" />;
      default:
        return <Layout className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#030712] border-t border-b border-cyan-500/15 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Value for Organizations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive Services I Deliver to{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent text-glow-cyan">
              Engineering Teams
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            From modern responsive frontend interfaces with Three.js and GSAP animations to containerized AWS cloud deployments and intelligent AI pipelines, here is how I help organizations scale their web products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                activeServiceId === service.id
                  ? 'bg-gradient-to-b from-[#0e162d] via-[#080d1e] to-[#040713] border-cyan-400/60 shadow-2xl shadow-cyan-950/50 translate-y-[-4px]'
                  : 'bg-gradient-to-b from-[#080d1d] via-[#050814] to-[#03060f] border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0a1024]'
              }`}
              onMouseEnter={() => setActiveServiceId(service.id)}
            >
              <div>
                {/* Icon and Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-center shadow-inner">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-cyan-400/80 font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    0{servicesData.indexOf(service) + 1}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block font-mono">
                    Organizational Deliverables:
                  </span>
                  {service.deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & CTA */}
              <div className="pt-4 border-t border-slate-800/80 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group transition-colors"
                >
                  <span>Inquire about this capability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Organizational Commitment Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-slate-950 via-[#0a1226] to-slate-950 p-6 sm:p-8 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
              Ready to collaborate with high-standard engineering teams
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Experienced in agile sprint environments, Git branch workflows, and writing production-grade testable code.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 transition-all whitespace-nowrap shadow-lg shadow-cyan-500/25 hover:scale-105"
          >
            Hire for Your Team
          </a>
        </div>

      </div>
    </section>
  );
};
