import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { MessageSquare, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading.tsx';
import { Scroll3D } from './Scroll3D.tsx';
import { FloatingShapes } from './FloatingShapes.tsx';

interface ScopeEstimatorProps {
  onSelectEstimateForInquiry: (summary: string) => void;
}

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Understand your business',
    desc: 'We learn what you want to achieve — a new website, an operations portal, or a mobile ordering app — and map out the simplest path there.'
  },
  {
    icon: Wrench,
    title: 'Design & build',
    desc: 'We design clean, intuitive interfaces and engineer reliable software. You review real progress every step of the way.'
  },
  {
    icon: Rocket,
    title: 'Launch & support',
    desc: 'We handle the technical setup, domains and app-store listings, then stay on hand with friendly NZ-based support.'
  }
];

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({ onSelectEstimateForInquiry }) => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lineProgress } = useScroll({ target: stepsRef, offset: ['start 0.8', 'end 0.5'] });

  return (
    <section id="scope-estimator" className="relative py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <FloatingShapes
        shapes={[
          { kind: 'cube', position: { top: '8%', right: '8%' }, size: 70, speed: -280, spin: 16 },
          { kind: 'sphere', position: { bottom: '20%', left: '3%' }, size: 46, speed: -360 }
        ]}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              A simple, <span className="accent-serif text-gradient">transparent</span> process.
            </>
          }
          description="No corporate bureaucracy — clear communication, practical timelines and software that solves real problems."
        />

        <div ref={stepsRef} className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 [perspective:1200px]">
          {/* Connecting line between steps, drawn by scrolling */}
          <div aria-hidden="true" className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-slate-200 dark:bg-slate-800" />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: lineProgress }}
            className="hidden md:block absolute top-7 left-[8%] right-[8%] h-[2px] -mt-px origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
          />
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, rotateY: -80, y: 30 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-sky-600 dark:text-sky-400"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className="mt-6 accent-serif text-xl text-slate-400 dark:text-slate-500">Step {idx + 1}</div>
                  <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Scroll3D tilt={28}>
          <div className="relative mt-20 overflow-hidden rounded-[2rem] bg-slate-900 dark:bg-slate-900 p-8 sm:p-12 text-white">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 opacity-40 blur-3xl animate-float" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Have a project in mind? <span className="accent-serif text-sky-300">Let's talk.</span>
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
                  Tell us what you need and we'll prepare a clear, no-obligation proposal.
                </p>
              </div>
              <button
                onClick={() => onSelectEstimateForInquiry('Inquiry for custom software solution')}
                className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition-transform active:scale-95"
              >
                Get a proposal
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Scroll3D>
      </div>
    </section>
  );
};
