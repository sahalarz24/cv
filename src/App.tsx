import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { RecruiterMatch } from './components/RecruiterMatch';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar onOpenCVModal={() => setIsCVModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <ErrorBoundary>
          {/* Split Hero with Recruiter Focus and Personal Photo */}
          <Hero onOpenCVModal={() => setIsCVModalOpen(true)} />

          {/* About Sahal Arzaka */}
          <AboutSection onOpenCVModal={() => setIsCVModalOpen(true)} />

          {/* Interactive Skills Matrix (3D, Canva, SI, Pramuka) */}
          <SkillsSection />

          {/* Portfolio Showcase with Interactive 3D WebGL Canvas */}
          <PortfolioSection />

          {/* Educational Journey & Scout Leadership */}
          <ExperienceTimeline />

          {/* Recruiter Quick Guide: Why Hire Sahal? */}
          <RecruiterMatch onOpenCVModal={() => setIsCVModalOpen(true)} />

          {/* Direct Contact & Message Composer */}
          <ContactSection />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />

      {/* Printable / ATS-Friendly CV Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
