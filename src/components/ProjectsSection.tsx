import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { Play, ExternalLink, Code2, Sparkles, LayoutList, LayoutGrid, CheckCircle } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'live' | 'video' | 'smart-systems' | 'frontend' | 'systems'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects (15)' },
    { id: 'live', label: 'Live Deployed (2)' },
    { id: 'video', label: 'Video Walkthroughs (6)' },
    { id: 'smart-systems', label: 'Smart Systems & Algos' },
    { id: 'frontend', label: '3D & Motion Frontends' },
    { id: 'systems', label: 'Compilers & Core Web' }
  ] as const;

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'live') return Boolean(project.liveUrl);
    if (activeCategory === 'video') return Boolean(project.videoUrl);
    if (activeCategory === 'smart-systems') return project.category === 'smart-systems';
    if (activeCategory === 'frontend') return project.category === 'frontend';
    if (activeCategory === 'systems') return project.category === 'systems' || project.category === 'web-apps';
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background ambient purple glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#7e22ce]/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching original: .project h4 */}
        <div className="text-center mb-12">
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-[#b651f0] tracking-widest uppercase drop-shadow-[0_0_35px_rgba(182,81,240,0.35)]">
            PROJECTS
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2">
            15 Production & Interactive Systems · 6 Full Walkthrough Videos · 2 Live Netlify Apps
          </p>
        </div>

        {/* Filter Controls & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#b651f0] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: List (.elem style) vs Grid */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Editorial Index List View (Original Theme)"
            >
              <LayoutList className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-[11px]">List View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Interactive Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-[11px]">Grid View</span>
            </button>
          </div>
        </div>

        {/* LIST VIEW: The iconic .elem rows from user's original portfolio */}
        {viewMode === 'list' && (
          <div className="space-y-0 border-b border-white/10 relative">
            {filteredProjects.map((project, idx) => {
              const displayIndex = String(idx + 1).padStart(2, '0');
              const isHovered = hoveredProjectId === project.id;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-4 sm:px-6 border-t border-white/10 hover:bg-[#b651f0]/[0.06] hover:border-[#b651f0]/40 transition-all duration-300 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  {/* Left: Index & Title */}
                  <div className="flex items-center gap-4 sm:gap-6 z-10">
                    <span className="font-mono text-xs sm:text-sm text-slate-500 font-bold tabular-nums">
                      {displayIndex}
                    </span>
                    <div>
                      <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-[#d68aff] group-hover:text-white tracking-wide transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-poppins text-slate-400">
                        <span>{project.subtitle}</span>
                        {project.liveUrl && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            LIVE NETLIFY
                          </span>
                        )}
                        {project.videoUrl && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                            VIDEO DEMO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0 z-10 shrink-0">
                    {/* Live URL Button if available */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all hover:scale-105 shadow-md"
                        title={`Open live deployment at ${project.liveUrl}`}
                      >
                        <span>Live App</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Video Demo Button if available */}
                    {project.videoUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#b651f0] hover:bg-[#a855f7] text-white transition-all hover:scale-105 shadow-md shadow-purple-950/50"
                        title="Watch full video walkthrough"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Demo</span>
                      </button>
                    )}

                    {/* Interactive Sandbox Button for merged projects */}
                    {!project.videoUrl && !project.liveUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        <Code2 className="w-3.5 h-3.5 text-[#b651f0]" />
                        <span>Try Sandbox</span>
                      </button>
                    )}

                    <span className="hidden sm:inline font-bebas text-lg tracking-wider text-slate-500 group-hover:text-[#b651f0] transition-colors ml-2">
                      VIEW DETAILS →
                    </span>
                  </div>

                  {/* Floating Tag Preview on Row Hover (like original .elem hover) */}
                  <div
                    className={`hidden lg:flex pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 items-center gap-2 px-4 py-2 rounded-xl bg-black/95 border border-[#b651f0] shadow-2xl ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#b651f0] animate-ping" />
                    <span className="font-bebas text-lg tracking-wide text-white">
                      {project.title}
                    </span>
                    <span className="text-xs font-mono text-[#d68aff]">
                      [{project.tags.slice(0, 2).join(' · ')}]
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* GRID VIEW: Interactive Bento / Card Grid */}
        {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#b651f0]/60 hover:bg-[#b651f0]/[0.04] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {project.liveUrl ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        LIVE NETLIFY
                      </span>
                    ) : project.videoUrl ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        VIDEO DEMO
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        INTERACTIVE SANDBOX
                      </span>
                    )}
                  </div>

                  <h3 className="font-bebas text-2xl sm:text-3xl text-[#d68aff] group-hover:text-white tracking-wide transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-poppins text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-slate-400">
                    {project.videoUrl ? "Walkthrough Available" : project.liveUrl ? "Deployed" : "Executable"}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 flex items-center gap-1"
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="px-3 py-1 rounded text-xs font-bold bg-[#b651f0] text-white hover:bg-[#a855f7] flex items-center gap-1"
                    >
                      {project.videoUrl ? <Play className="w-3 h-3 fill-current" /> : <Code2 className="w-3 h-3" />}
                      <span>{project.videoUrl ? "Demo" : "Details"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
