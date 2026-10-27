import React from 'react';
import { MessageSquare, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';
import { SectionHeading } from './SectionHeading.tsx';

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
  return (
    <section id="scope-estimator" className="py-24 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              A simple, <span className="accent-serif text-gradient">transparent</span> process.
            </>
          }
          description="No corporate bureaucracy — clear communication, practical timelines and software that solves real problems."
        />

        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Connecting line between steps */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-sky-500/0 via-sky-500/50 to-emerald-500/0"
          />
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.title} direction="up" delayMs={100 + idx * 120}>
                <div className="relative">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-sky-600 dark:text-sky-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="mt-6 accent-serif text-xl text-slate-400 dark:text-slate-500">Step {idx + 1}</div>
                  <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal direction="up" delayMs={200}>
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
        </ScrollReveal>
      </div>
    </section>
  );
};
