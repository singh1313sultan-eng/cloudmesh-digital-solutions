import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';

interface HeaderProps {
  onOpenInquiry: (initialSolution?: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenInquiry,
  theme,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs dark:shadow-lg dark:shadow-black/20'
          : 'bg-transparent border-b border-slate-200/40 dark:border-slate-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official CloudMesh Brand Logo with embedded traveling dot anchor */}
        <a
          href="#"
          className="group transition-transform active:scale-98"
          aria-label="CloudMesh Digital Solutions Home"
        >
          <CloudMeshLogo size="md" anchorDotId="logo-dot-anchor" />
        </a>

        {/* Zone 2: Clean, simple navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#websites"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 py-1"
          >
            Websites
          </a>
          <a
            href="#portals"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 py-1"
          >
            Admin Portals
          </a>
          <a
            href="#mobile-apps"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 py-1"
          >
            Food & Mobile Apps
          </a>
          <a
            href="#interactive-showcase"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 py-1"
          >
            Live Previews
          </a>
          <a
            href="#contact"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary action + Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>

          <button
            onClick={() => onOpenInquiry()}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 rounded-md transition-colors whitespace-nowrap shadow-sm active:scale-95"
          >
            Get in Touch
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-5 space-y-4 shadow-lg">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <CloudMeshLogo size="sm" />
          </div>
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            <a
              href="#websites"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Websites
            </a>
            <a
              href="#portals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Admin Portals
            </a>
            <a
              href="#mobile-apps"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Food & Mobile Apps
            </a>
            <a
              href="#interactive-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Live Previews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
