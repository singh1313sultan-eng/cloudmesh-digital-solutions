import React from 'react';
import { TECH_STACK } from '../data/projects.ts';

export const TechMarquee: React.FC = () => (
  <section aria-label="Technologies we work with" className="relative py-10 border-y border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 overflow-hidden">
    <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Rendered twice so the -50% translate loops seamlessly */}
        {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
          <li
            key={i}
            aria-hidden={i >= TECH_STACK.length}
            className="flex items-center gap-10 pr-10 text-lg sm:text-xl font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap"
          >
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">{tech}</span>
            <span className="w-1.5 h-1.5 rotate-45 bg-sky-500/60" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
