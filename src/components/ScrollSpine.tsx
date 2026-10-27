import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

/** Top reading-progress bar plus a back-to-top button. */
export const ScrollSpine: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      // Written straight to the DOM so scrolling never re-renders React.
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setIsScrolledPastHero(window.scrollY > 600);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none" aria-hidden="true">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full glass text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
          isScrolledPastHero ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-3'
        }`}
        aria-label="Scroll back to top"
        tabIndex={isScrolledPastHero ? 0 : -1}
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  );
};
