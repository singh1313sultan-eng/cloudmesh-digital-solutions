import React from 'react';
import { ShieldCheck, Smartphone, Zap, HeartHandshake, CheckCircle2, Cloud } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';

export const Architecture: React.FC = () => {
  const highlights = [
    {
      icon: Smartphone,
      title: 'Works on Every Device',
      desc: 'Whether you or your customers are on an iPhone, Android, tablet, or desktop, our websites, admin portals, and food apps adapt smoothly to the screen.'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      desc: 'Nobody likes slow websites or laggy order screens. We write clean, optimized code hosted on modern cloud infrastructure so your tools load instantly.'
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure',
      desc: 'Your customer data, order history, and business files are protected with encrypted connections and regular backups.'
    },
    {
      icon: HeartHandshake,
      title: 'Local New Zealand Support',
      desc: 'Based in Auckland, we are easy to reach by phone or email. You talk directly with the engineers building your software, not a distant call center.'
    }
  ];

  return (
    <section id="architecture" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delayMs={50}>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <span
                id="dot-anchor-architecture"
                className="w-2.5 h-2.5 rounded-sm border border-sky-500/40 dark:border-sky-400/40 rotate-45 inline-block shrink-0"
                aria-hidden="true"
              />
              <span>Built Right for Your Business</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
              Reliable software that works when you need it.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We design tools that solve your daily operational headaches without creating new technical headaches for you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} direction="up" delayMs={100 + idx * 60}>
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
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
