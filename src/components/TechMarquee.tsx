import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TECH_STACK } from '../data/projects.ts';

const Ribbon: React.FC<{ reverse?: boolean; className?: string; itemClassName?: string }> = ({
  reverse,
  className = '',
  itemClassName = ''
}) => (
  <div className={`py-4 ${className}`}>
    <ul
      className="flex w-max hover:[animation-play-state:paused]"
      style={{ animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${reverse ? 46 : 40}s linear infinite` }}
    >
      {/* Rendered twice so the -50% translate loops seamlessly */}
      {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
        <li
          key={i}
          aria-hidden={i >= TECH_STACK.length}
          className={`flex items-center gap-10 pr-10 text-lg sm:text-xl font-semibold whitespace-nowrap ${itemClassName}`}
        >
          <span>{tech}</span>
          <span className="w-1.5 h-1.5 rotate-45 bg-current opacity-50" aria-hidden="true" />
        </li>
      ))}
    </ul>
  </div>
);

/** Two technology ribbons crossing in 3D, twisting further as the page scrolls. */
export const TechMarquee: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const twist = useTransform(scrollYProgress, [0, 0.3], [0, 10]);
  const twistBack = useTransform(twist, v => -v);

  return (
    <section
      aria-label="Technologies we work with"
      className="relative py-16 bg-white dark:bg-slate-950 overflow-hidden [perspective:1000px]"
    >
      <motion.div
        style={{ rotateX: twist }}
        className="relative z-10 -mx-8 -rotate-2 bg-slate-900 dark:bg-white shadow-2xl"
      >
        <Ribbon itemClassName="text-white dark:text-slate-900" />
      </motion.div>
      <motion.div
        style={{ rotateX: twistBack }}
        className="-mx-8 -mt-6 rotate-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 opacity-90"
      >
        <Ribbon reverse itemClassName="text-white/90" />
      </motion.div>
    </section>
  );
};
