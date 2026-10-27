import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';
import { NAV_LINKS } from '../data/site.ts';

interface HeaderProps {
  onOpenInquiry: (initialSolution?: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3">
      <div
        className={`mx-auto max-w-6xl rounded-full transition-all duration-500 ${
          isScrolled || mobileMenuOpen
            ? 'glass border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/5 dark:shadow-black/30'
            : 'border border-transparent'
        }`}
      >
        <div className="h-16 pl-4 pr-2 sm:pl-5 flex items-center justify-between gap-4">
          <a href="#top" className="shrink-0 transition-transform active:scale-95" aria-label="CloudMesh Digital Solutions home">
            <CloudMeshLogo size="sm" />
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors"
              title={`Switch to ${nextTheme} theme`}
              aria-label={`Switch to ${nextTheme} theme`}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            <button
              onClick={() => onOpenInquiry()}
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-900 dark:bg-white px-5 py-2.5 text-xs font-semibold text-white dark:text-slate-950 transition-transform active:scale-95"
            >
              Start a Project
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(open => !open)}
              className="md:hidden p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden mx-auto mt-2 max-w-6xl rounded-3xl glass border border-slate-200 dark:border-slate-800 p-4 shadow-xl"
        >
          <ul className="flex flex-col text-base font-medium text-slate-800 dark:text-slate-100">
            {[...NAV_LINKS, { href: '#contact', label: 'Contact' }].map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
