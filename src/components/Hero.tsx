import React, { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';
import { Magnetic } from './Magnetic.tsx';
import { CountUp } from './CountUp.tsx';
import { PROJECTS } from '../data/projects.ts';

// three.js is split into its own chunk so first paint never waits on WebGL code.
const HeroScene = lazy(() => import('./HeroScene.tsx'));

interface HeroProps {
  onOpenInquiry: () => void;
}

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: 'We build websites & portals' },
  { text: 'that move business forward.', accent: true }
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Headline whose words rise out of a soft blur one after another. */
const AnimatedHeadline: React.FC = () => {
  let wordIndex = 0;
  return (
    <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-[-0.035em] leading-[1.02] [text-wrap:balance]">
      {HEADLINE.map(part =>
        part.text.split(' ').map(word => {
          const i = wordIndex++;
          return (
            <React.Fragment key={i}>
              <motion.span
                className={`inline-block ${part.accent ? 'accent-serif text-gradient pr-[0.08em]' : ''}`}
                initial={{ opacity: 0, y: '0.45em', filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: EASE }}
              >
                {word}
              </motion.span>{' '}
            </React.Fragment>
          );
        })
      )}
    </h1>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Ambient light, drifting slowly */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] w-[720px] h-[720px] rounded-full bg-gradient-to-br from-sky-300/40 via-cyan-200/30 to-emerald-200/30 dark:from-sky-600/20 dark:via-cyan-700/10 dark:to-emerald-700/10 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-20%] left-[-10%] w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-200/40 to-sky-100/20 dark:from-indigo-900/30 dark:to-transparent blur-[120px]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3D scene: full-bleed behind copy on mobile, right column on desktop */}
      <div className="absolute inset-0 lg:left-[42%] opacity-40 sm:opacity-60 lg:opacity-100">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <ScrollReveal direction="up" delayMs={50}>
            <div className="inline-flex items-center gap-2 rounded-full glass border border-slate-200/80 dark:border-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Digital product studio · Auckland, New Zealand
            </div>
          </ScrollReveal>

          <AnimatedHeadline />

          <ScrollReveal direction="up" delayMs={700}>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl [text-wrap:pretty]">
              CloudMesh designs and engineers high-performance websites, web portals and mobile apps — from restaurant
              ordering platforms to enterprise dashboards.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={820}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 dark:bg-white px-7 py-3.5 text-sm font-semibold text-white dark:text-slate-950 shadow-xl shadow-slate-900/20 dark:shadow-sky-500/20 transition-transform active:scale-95"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">View Our Work</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 rounded-full glass border border-slate-300/80 dark:border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-slate-900 dark:hover:border-white transition-colors"
                >
                  Start a Project
                </button>
              </Magnetic>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={900}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
              {['Mobile-first & lightning fast', 'Built around your workflow', 'You own the code'].map(item => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={980}>
            <dl className="mt-12 grid grid-cols-3 gap-4 max-w-xl border-t border-slate-200 dark:border-slate-800 pt-6">
              <div>
                <dt className="sr-only">Products shipped</dt>
                <dd className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  <CountUp to={PROJECTS.length} suffix="+" />
                </dd>
                <dd className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Products shipped</dd>
              </div>
              <div>
                <dt className="sr-only">Platforms</dt>
                <dd className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Web · iOS · Android</dd>
                <dd className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Platforms we deliver on</dd>
              </div>
              <div>
                <dt className="sr-only">Location</dt>
                <dd className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">NZ</dd>
                <dd className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Registered & Auckland-based</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#solutions"
        aria-label="Scroll to services"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 h-11 w-7 items-start justify-center rounded-full border-2 border-slate-300 dark:border-slate-700 p-1.5"
      >
        <span className="h-2 w-1 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
      </a>
    </section>
  );
};
