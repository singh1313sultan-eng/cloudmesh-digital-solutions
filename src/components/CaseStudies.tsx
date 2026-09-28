import React from 'react';
import { UtensilsCrossed, Building2, Store, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      category: 'Food Cart & Hospitality',
      client: 'Harbor Artisan Food Truck',
      icon: UtensilsCrossed,
      headline: 'Eliminated long takeaway queues with a live kitchen order screen.',
      challenge: 'During busy lunch rushes, customers gathered in crowded lines outside the food cart window, and handwritten order tickets caused kitchen confusion.',
      solution: 'We built a streamlined mobile ordering web app where customers order ahead, and a kitchen tablet screen showing tickets as "Preparing" and "Ready for Pickup".',
      outcome: 'Orders flow smoothly into the kitchen, customers get notified on their phones when food is hot and ready, and staff spend more time cooking and less time managing queues.'
    },
    {
      category: 'Service Business',
      client: 'North Shore Trade Services',
      icon: Building2,
      headline: 'Replaced messy spreadsheets with an all-in-one business admin portal.',
      challenge: 'Customer inquiries, job bookings, and team schedules were scattered across text messages, paper notes, and confusing spreadsheets.',
      solution: 'CloudMesh created a custom business admin portal accessible from any phone or computer, organizing customer records, job progress stages, and staff assignments in one place.',
      outcome: 'Every incoming inquiry is logged immediately, team members know their daily assignments, and the owner can see business operations from anywhere.'
    },
    {
      category: 'Food Shop & Bakery',
      client: 'Kōwhai Artisan Bakery & Cafe',
      icon: Store,
      headline: 'Saved thousands by dropping third-party food app commission fees.',
      challenge: 'Third-party delivery apps were taking huge cuts of every order, eroding profits on freshly baked items and daily lunch specials.',
      solution: 'We launched a branded mobile ordering website allowing loyal locals to browse the daily menu, place pre-orders, and pick up fresh goods directly.',
      outcome: 'The bakery keeps all of their hard-earned revenue, owns their direct customer relationships, and easily updates sold-out items from their phone.'
    }
  ];

  return (
    <section id="case-studies" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delayMs={50}>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <span
                id="dot-anchor-casestudies"
                className="w-2.5 h-2.5 rounded-sm border border-sky-500/40 dark:border-sky-400/40 rotate-45 inline-block shrink-0"
                aria-hidden="true"
              />
              <span>Real Business Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
              How business owners use what we build.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Real examples of how custom websites, business portals, and food ordering apps solve daily operational bottlenecks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((cs, index) => {
            const Icon = cs.icon;
            return (
              <ScrollReveal key={index} direction="up" delayMs={100 + index * 80}>
                <div className="h-full bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded">
                        {cs.category}
                      </span>
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {cs.headline}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-200">The Problem: </strong>
                        {cs.challenge}
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-200">What We Built: </strong>
                        {cs.solution}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 bg-white/60 dark:bg-slate-950/40 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{cs.outcome}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
