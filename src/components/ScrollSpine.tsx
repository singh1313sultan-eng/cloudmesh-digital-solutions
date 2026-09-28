import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollSpine: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)) : 0;
          setScrollProgress(progress);
          setIsScrolledPastHero(currentScroll > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Slim Top Laser Progress Bar with leading pulse spark */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-slate-200/60 dark:bg-slate-900/50"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-sky-500 to-cyan-400 dark:from-teal-400 dark:via-sky-400 dark:to-cyan-300 relative transition-all duration-75 ease-out shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing leading packet spark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#38bdf8] -mr-1"></div>
        </div>
      </div>

      {/* Floating Back to Start / Top Button (appears once user scrolls past hero) */}
      {isScrolledPastHero && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 group"
            title="Return to Auckland HQ Start"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      )}
    </>
  );
};

