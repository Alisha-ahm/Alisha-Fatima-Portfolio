import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDemoModal } from './components/ProjectDemoModal';
import { InternshipLetterModal } from './components/InternshipLetterModal';
import { Preloader } from './components/Preloader';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col font-sans selection:bg-[#b651f0]/40 selection:text-white relative">
      
      {/* Intro Preloader matching user's original portfolio entrance */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Avant-Garde Minimalist Header */}
      <Navbar
        onOpenLetter={() => setIsLetterModalOpen(true)}
        onOpenReel={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Flow */}
      <main className="flex-1 relative z-10">
        <Hero onOpenLetter={() => setIsLetterModalOpen(true)} />
        <AboutSection onOpenLetter={() => setIsLetterModalOpen(true)} />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <ExperienceSection onOpenLetter={() => setIsLetterModalOpen(true)} />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenLetter={() => setIsLetterModalOpen(true)} />

      {/* Modals */}
      <ProjectDemoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <InternshipLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
      />
    </div>
  );
}
