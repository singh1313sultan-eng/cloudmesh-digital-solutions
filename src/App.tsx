import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TechMarquee } from './components/TechMarquee.tsx';
import { ScrollStatement } from './components/ScrollStatement.tsx';
import { CursorGlow } from './components/CursorGlow.tsx';
import { Solutions } from './components/Solutions.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { InteractiveShowcase } from './components/InteractiveShowcase.tsx';
import { ScopeEstimator } from './components/ScopeEstimator.tsx';
import { Architecture } from './components/Architecture.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ScrollSpine } from './components/ScrollSpine.tsx';
import { Scroll3D } from './components/Scroll3D.tsx';
import { SolutionType } from './types/index.ts';
import { THEME_STORAGE_KEY } from './data/site.ts';

type Theme = 'light' | 'dark';

const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  // index.html applies the stored theme before first paint; mirror it here.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  const [activeShowcaseTab, setActiveShowcaseTab] = useState<SolutionType>('food-saas');
  const [prefilledScope, setPrefilledScope] = useState('');
  const [prefilledSolution, setPrefilledSolution] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage unavailable (private mode etc.) — theme still applies for this visit.
    }
  }, [theme]);

  const handleSelectSolutionDemo = (type: SolutionType) => {
    setActiveShowcaseTab(type);
    scrollToSection('interactive-showcase');
  };

  const handleOpenInquiry = (solutionName?: string) => {
    if (solutionName) setPrefilledSolution(solutionName);
    scrollToSection('contact');
  };

  const handleSelectEstimateForInquiry = (summary: string) => {
    setPrefilledScope(summary);
    scrollToSection('contact');
  };

  const handleClearPrefill = () => {
    setPrefilledScope('');
    setPrefilledSolution('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <ScrollSpine />
      <CursorGlow />

      <Header
        onOpenInquiry={handleOpenInquiry}
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      />

      <main id="main">
        <Hero onOpenInquiry={() => handleOpenInquiry()} />
        <TechMarquee />
        <ScrollStatement />
        <Solutions onSelectSolutionDemo={handleSelectSolutionDemo} onOpenInquiry={handleOpenInquiry} />
        <Portfolio />

        <Scroll3D tilt={20}>
          <InteractiveShowcase
            activeTab={activeShowcaseTab}
            setActiveTab={setActiveShowcaseTab}
            onOpenInquiry={handleOpenInquiry}
          />
        </Scroll3D>

        <Architecture />
        <ScopeEstimator onSelectEstimateForInquiry={handleSelectEstimateForInquiry} />
        <ContactSection
          prefilledScope={prefilledScope}
          prefilledSolution={prefilledSolution}
          onClearPrefill={handleClearPrefill}
        />
      </main>

      <Footer />
    </div>
  );
}
