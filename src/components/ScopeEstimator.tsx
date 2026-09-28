import React from 'react';
import { MessageSquare, Wrench, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';

interface ScopeEstimatorProps {
  onSelectEstimateForInquiry: (summary: string) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({ onSelectEstimateForInquiry }) => {
  const steps = [
    {
      icon: MessageSquare,
      title: '1. Understand Your Business',
      desc: 'We discuss what you want to achieve—whether that is launching a clean new website, setting up an admin portal to manage customers, or building a mobile ordering app for your food cart or shop.'
    },
    {
      icon: Wrench,
      title: '2. Design & Build',
      desc: 'Our team designs clean, intuitive interfaces and builds reliable software that works smoothly on every phone, tablet, and computer. You review progress directly as we build.'
    },
    {
      icon: Rocket,
      title: '3. Launch & Dedicated Support',
      desc: 'We take care of the technical setup, connect your domain or app store listings, and provide friendly, ongoing New Zealand based support whenever you need assistance.'
    }
  ];

  return (
    <section id="scope-estimator" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delayMs={50}>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <span
                id="dot-anchor-estimator"
                className="w-2.5 h-2.5 rounded-sm border border-sky-500/40 dark:border-sky-400/40 rotate-45 inline-block shrink-0"
                aria-hidden="true"
              />
              <span>Simple, Direct Process</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How We Work With You
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              No complicated corporate bureaucracy. Just clear communication, practical timelines, and software that solves real problems for your business.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={idx} direction="up" delayMs={100 + idx * 80}>
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action strip */}
        <ScrollReveal direction="up" delayMs={240}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-sky-50 dark:bg-slate-900 border border-sky-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Have a project in mind for your business?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Tell us what you need and we will prepare a clear, straightforward proposal with no obligation.
              </p>
            </div>

            <button
              onClick={() => onSelectEstimateForInquiry('Inquiry for custom software solution')}
              className="px-6 py-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 rounded-lg transition-all whitespace-nowrap shadow-sm active:scale-95 inline-flex items-center gap-2 shrink-0"
            >
              Get in Touch with Our Team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
