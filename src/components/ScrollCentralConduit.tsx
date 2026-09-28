import React, { useState, useEffect } from 'react';

export const ScrollCentralConduit: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = window.scrollY;
          const pct = totalHeight > 0 ? (current / totalHeight) * 100 : 0;
          setScrollPercentage(Math.min(100, Math.max(0, pct)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div 
      className="absolute left-1/2 -translate-x-1/2 top-48 bottom-32 w-16 pointer-events-none z-0 hidden lg:block overflow-hidden"
      aria-hidden="true"
    >
      {/* Delicate background spinal line linking start to end */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-sky-500/20 via-slate-300 dark:via-slate-800/60 to-sky-500/20"></div>

      {/* Dynamic illuminated trail following the scroll progress */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[1.5px] bg-gradient-to-b from-teal-500 via-sky-500 to-sky-400 dark:from-teal-400 dark:via-sky-400 dark:to-sky-200 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.6)]"
        style={{ height: `${scrollPercentage}%` }}
      >
        {/* Moving Luminous Data Packet that glides down with scroll from start to end */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-4 h-4 rounded-full bg-sky-500/20 dark:bg-sky-400/20 flex items-center justify-center -mb-2">
          <div className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-300 shadow-[0_0_14px_rgba(56,189,248,1)] animate-ping"></div>
          <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#38bdf8]"></div>
        </div>
      </div>

      {/* Decorative node rings along the path */}
      {[12, 28, 44, 60, 76, 92].map((pct, idx) => {
        const isReached = scrollPercentage >= pct;
        return (
          <div
            key={idx}
            className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              isReached
                ? 'border-sky-500 dark:border-sky-400 bg-white dark:bg-slate-950 shadow-[0_0_8px_rgba(56,189,248,0.8)] scale-110'
                : 'border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/80'
            }`}
            style={{ top: `${pct}%` }}
          >
            {isReached && (
              <div className="w-1 h-1 rounded-full bg-sky-500 dark:bg-sky-300 mx-auto mt-[2px]"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
