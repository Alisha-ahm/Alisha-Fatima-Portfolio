import React from 'react';
import { Code2, Cpu, Globe, Layers, Server, Terminal, Box, CloudRain, ShieldCheck } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  // Foundational 6 Skills from original portfolio
  const coreSkills = [
    {
      name: "HTML",
      level: 98,
      description: "Well-structured, semantic layouts forming the foundation of accessible, SEO-optimized web systems.",
      badge: "Semantic 5"
    },
    {
      name: "CSS",
      level: 98,
      description: "Visually striking, responsive interfaces with custom keyframe animations, grid, and flexbox systems.",
      badge: "Modern CSS3"
    },
    {
      name: "JavaScript",
      level: 80,
      description: "Dynamic DOM engineering, event delegation, async pipelines, modular ES6 architectures, and APIs.",
      badge: "ES6+ Modular"
    },
    {
      name: "Java",
      level: 80,
      description: "Scalable object-oriented software design, clean multi-class architectures, and enterprise patterns.",
      badge: "OOP & Arch"
    },
    {
      name: "Python",
      level: 80,
      description: "Algorithmic problem-solving, data parsing scripts, automation pipelines, and backend routing.",
      badge: "Algorithmic"
    },
    {
      name: "C-Language",
      level: 80,
      description: "Low-level memory handling, pointer manipulation, and foundational systems programming.",
      badge: "Systems & Memory"
    }
  ];

  // Modern Cloud, 3D & Framework Stack (Icon based)
  const modernStack = [
    { name: "React 19", icon: <Globe className="w-5 h-5 text-cyan-400" />, desc: "Hooks, SPA architectures" },
    { name: "TypeScript", icon: <Code2 className="w-5 h-5 text-blue-400" />, desc: "Strict type safety" },
    { name: "Three.js / WebGL", icon: <Box className="w-5 h-5 text-purple-400" />, desc: "3D scenes & shaders" },
    { name: "GSAP Motion", icon: <Layers className="w-5 h-5 text-emerald-400" />, desc: "Timeline animations" },
    { name: "Node.js & Express", icon: <Server className="w-5 h-5 text-green-400" />, desc: "REST APIs & middleware" },
    { name: "Docker & AWS", icon: <CloudRain className="w-5 h-5 text-amber-400" />, desc: "ECS, ECR, containerization" },
    { name: "Algorithms & Heaps", icon: <Cpu className="w-5 h-5 text-fuchsia-400" />, desc: "Priority queues & intervals" },
    { name: "Git & CI/CD", icon: <Terminal className="w-5 h-5 text-rose-400" />, desc: "Version control & workflows" }
  ];

  return (
    <section id="skills" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#7e22ce]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SKILLS Animated Header matching original: .skills span with hover scale */}
        <div className="text-center mb-16 select-none">
          <h2 className="font-bebas tracking-[0.3em] inline-flex items-center gap-1 sm:gap-2">
            {'SKILLS'.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block font-bebas text-5xl sm:text-7xl md:text-8xl text-slate-200 hover:text-[#b651f0] hover:scale-125 transition-all duration-300 cursor-pointer drop-shadow-[0_0_20px_rgba(182,81,240,0.3)]"
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Hover over letters to interact · Foundational languages, algorithms & cloud architectures
          </p>
        </div>

        {/* 6 Core Language Cards with Circular Progress Meters matching original .box & .circle */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {coreSkills.map((skill, index) => {
            const circumference = 2 * Math.PI * 38;
            const strokeDashoffset = circumference - (skill.level / 100) * circumference;

            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#b651f0]/60 hover:bg-[#b651f0]/[0.05] transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#d68aff]">
                      {skill.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-bebas text-3xl sm:text-4xl text-white group-hover:text-[#d68aff] tracking-wide transition-colors">
                    {skill.name}
                  </h3>

                  <p className="font-poppins text-xs text-slate-300 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Circular Percentage Meter */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-slate-400">Mastery Level</span>
                  
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 90 90">
                      <circle
                        cx="45"
                        cy="45"
                        r="38"
                        className="stroke-white/10 fill-none"
                        strokeWidth="6"
                      />
                      <circle
                        cx="45"
                        cy="45"
                        r="38"
                        className="stroke-[#b651f0] fill-none transition-all duration-1000 ease-out"
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute font-bebas text-lg text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern Web, Cloud & Interactive Stack (Icon Based Grid) */}
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
            <h3 className="font-bebas text-2xl tracking-wide text-white">
              MODERN PRODUCTION & CLOUD ECOSYSTEM
            </h3>
            <span className="text-xs font-mono text-[#b651f0]">
              REACT 19 · GSAP · THREE.JS · DOCKER · AWS ECS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {modernStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-[#b651f0]/40 transition-all group flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#b651f0]/20 transition-colors shrink-0">
                  {tech.icon}
                </div>
                <div>
                  <h4 className="font-bebas text-lg tracking-wide text-white group-hover:text-[#d68aff] transition-colors">
                    {tech.name}
                  </h4>
                  <p className="font-poppins text-[11px] text-slate-400">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
