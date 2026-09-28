import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Solutions } from './components/Solutions.tsx';
import { InteractiveShowcase } from './components/InteractiveShowcase.tsx';
import { ScopeEstimator } from './components/ScopeEstimator.tsx';
import { Architecture } from './components/Architecture.tsx';
import { CaseStudies } from './components/CaseStudies.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ScrollSpine } from './components/ScrollSpine.tsx';
import { ScrollCentralConduit } from './components/ScrollCentralConduit.tsx';
import { ScrollReveal } from './components/ScrollReveal.tsx';
import { TravelingLogoDot } from './components/TravelingLogoDot.tsx';
import { SolutionType } from './types/index.ts';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cloudmesh_theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    }
    // Default theme is LIGHT per user requirement
    return 'light';
  });

  const [activeShowcaseTab, setActiveShowcaseTab] = useState<SolutionType>('food-saas');
  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledSolution, setPrefilledSolution] = useState<string>('');

  // Synchronize HTML element dark class with state
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('cloudmesh_theme', theme);
    } catch {
      // Storage unavailable
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectSolutionDemo = (type: SolutionType) => {
    setActiveShowcaseTab(type);
    const showcaseElement = document.getElementById('interactive-showcase');
    if (showcaseElement) {
      showcaseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (solutionName?: string) => {
    if (solutionName) {
      setPrefilledSolution(solutionName);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEstimateForInquiry = (summary: string) => {
    setPrefilledScope(summary);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPrefill = () => {
    setPrefilledScope('');
    setPrefilledSolution('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-sky-500/20 selection:text-sky-900 dark:selection:text-sky-200 relative overflow-x-hidden transition-colors duration-200">
      {/* Traveling Blue Dot from Logo that moves across screens on scroll */}
      <TravelingLogoDot />

      {/* Scroll-linked spine, laser progress beam, and journey waypoints */}
      <ScrollSpine />

      {/* Top Bar Navigation with Light/Dark Theme Switcher */}
      <Header 
        onOpenInquiry={handleOpenInquiry} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="relative">
        {/* Central illuminated conduit line linking from start to end that moves with scroll */}
        <ScrollCentralConduit />

        {/* Hero Section with Live Telemetry */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* Core Solutions & Bento Grid */}
        <Solutions 
          onSelectSolutionDemo={handleSelectSolutionDemo}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Interactive Production Demos (Food SaaS KDS, CRM, Portal, Mobile) */}
        <ScrollReveal direction="up" delayMs={60}>
          <InteractiveShowcase
            activeTab={activeShowcaseTab}
            setActiveTab={setActiveShowcaseTab}
            onOpenInquiry={handleOpenInquiry}
          />
        </ScrollReveal>

        {/* Project Scope & Investment Estimator */}
        <ScrollReveal direction="up" delayMs={60}>
          <ScopeEstimator onSelectEstimateForInquiry={handleSelectEstimateForInquiry} />
        </ScrollReveal>

        {/* Global Edge Architecture & New Zealand Engineering Advantage */}
        <ScrollReveal direction="up" delayMs={60}>
          <Architecture />
        </ScrollReveal>

        {/* Client Case Studies & Quantified Outcomes */}
        <CaseStudies />

        {/* Contact & Technical Proposal Discovery */}
        <ScrollReveal direction="up" delayMs={60}>
          <ContactSection
            prefilledScope={prefilledScope}
            prefilledSolution={prefilledSolution}
            onClearPrefill={handleClearPrefill}
          />
        </ScrollReveal>
      </main>

      {/* Quiet, Authoritative Footer with NZBN and Jurisdiction details */}
      <Footer />
    </div>
  );
}

