import React from 'react';
import { Globe, LayoutDashboard, UtensilsCrossed, ArrowRight, CheckCircle2, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { SolutionType } from '../types/index.ts';
import { Scroll3D } from './Scroll3D.tsx';
import { FloatingShapes } from './FloatingShapes.tsx';
import { SectionHeading } from './SectionHeading.tsx';
import { TiltCard } from './TiltCard.tsx';

interface SolutionsProps {
  onSelectSolutionDemo: (type: SolutionType) => void;
  onOpenInquiry: (solution?: string) => void;
}

interface Service {
  id: string;
  index: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  panelTitle: string;
  panelRows: [string, string][];
  inquiry: string;
  cta: string;
  demo: SolutionType;
  demoLabel: string;
  gradient: string;
}

const SERVICES: Service[] = [
  {
    id: 'websites',
    index: '01',
    icon: Globe,
    label: 'Websites & E-commerce',
    title: 'Websites that turn visitors into customers.',
    description:
      'Fast, beautifully crafted websites and online stores that look superb on every screen, rank on Google and make it effortless to call, order or book.',
    features: ['Bespoke brand design', 'Online ordering & payments', 'SEO & performance tuned', 'Domain, hosting & email setup'],
    panelTitle: 'Every website includes',
    panelRows: [
      ['Custom design system', 'Included'],
      ['Contact & quote forms', 'Instant alerts'],
      ['Google search ready', 'Optimised'],
      ['Cloud hosting & SSL', 'Fully handled']
    ],
    inquiry: 'Custom Website',
    cta: 'Plan my website',
    demo: 'website',
    demoLabel: 'Live preview',
    gradient: 'from-sky-500 to-cyan-400'
  },
  {
    id: 'portals',
    index: '02',
    icon: LayoutDashboard,
    label: 'Web Portals & Dashboards',
    title: 'Portals that run your operations.',
    description:
      'Replace spreadsheets and paperwork with a secure web portal: orders, customers, inventory, staff and reporting — all in one place, from any browser.',
    features: ['Role-based staff access', 'Live KPI dashboards', 'Customer & order records', 'Integrations & REST APIs'],
    panelTitle: 'What you can manage',
    panelRows: [
      ['Customers & enquiries', 'Searchable'],
      ['Orders & project stages', 'Live status'],
      ['Owner vs staff access', 'Secure'],
      ['Invoices, receipts & files', 'Organised']
    ],
    inquiry: 'Business Admin Portal',
    cta: 'Plan my portal',
    demo: 'business-portal',
    demoLabel: 'Portal demo',
    gradient: 'from-teal-500 to-emerald-400'
  },
  {
    id: 'mobile-apps',
    index: '03',
    icon: UtensilsCrossed,
    label: 'Mobile & Food-Tech Apps',
    title: 'Apps for food businesses and teams on the move.',
    description:
      'From food carts to logistics fleets, we build iOS & Android apps with kitchen display screens, order-ready alerts and zero third-party commission.',
    features: ['Kitchen display screen (KDS)', 'QR & takeaway ordering', '"Order ready" notifications', 'iOS & Android builds'],
    panelTitle: 'How an order flows',
    panelRows: [
      ['Customer orders on phone', 'Step 1'],
      ['Kitchen sees it instantly', 'Step 2'],
      ['Customer notified for pickup', 'Step 3'],
      ['You keep 100% of revenue', 'Always']
    ],
    inquiry: 'Food Shop / Cart App',
    cta: 'Plan my app',
    demo: 'food-saas',
    demoLabel: 'Try ordering demo',
    gradient: 'from-indigo-500 to-sky-400'
  }
];

export const Solutions: React.FC<SolutionsProps> = ({ onSelectSolutionDemo, onOpenInquiry }) => {
  return (
    <section id="solutions" className="relative py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <FloatingShapes
        shapes={[
          { kind: 'cube', position: { top: '4%', right: '6%' }, size: 90, speed: -320, spin: 20 },
          { kind: 'ring', position: { top: '38%', left: '-3%' }, size: 220, speed: -180, spin: 16 },
          { kind: 'sphere', position: { top: '62%', right: '3%' }, size: 70, speed: -420 },
          { kind: 'cube', position: { bottom: '6%', left: '8%' }, size: 56, speed: -260, spin: 14 }
        ]}
        className="opacity-70 lg:opacity-100"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Everything your business needs to <span className="accent-serif text-gradient">grow online.</span>
            </>
          }
          description="Straightforward, high-quality digital products tailored to how you work — without the jargon."
        />

        <div className="mt-16 space-y-10 lg:space-y-16">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 === 1;
            return (
              <div key={s.id} id={s.id} className="scroll-mt-28">
                <Scroll3D axis={reversed ? 'right' : 'left'} tilt={22}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className={`lg:col-span-7 space-y-5 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className="accent-serif text-5xl text-slate-300 dark:text-slate-700 leading-none">{s.index}</span>
                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                          <Icon className="w-4 h-4" />
                          {s.label}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
                        {s.title}
                      </h3>
                      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{s.description}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-slate-700 dark:text-slate-300">
                        {s.features.map(f => (
                          <li key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button
                          onClick={() => onOpenInquiry(s.inquiry)}
                          className="group inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 transition-transform active:scale-95"
                        >
                          {s.cta}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button
                          onClick={() => onSelectSolutionDemo(s.demo)}
                          className="rounded-full border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white transition-colors"
                        >
                          {s.demoLabel}
                        </button>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                      <TiltCard className="rounded-3xl">
                        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 shadow-xl dark:shadow-black/40">
                          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-7 [transform-style:preserve-3d]">
                            <div className={`tilt-pop mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-lg`}>
                              <Icon className="w-6 h-6 animate-float" />
                            </div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white mb-3">{s.panelTitle}</div>
                            <ul className="space-y-2">
                              {s.panelRows.map(([name, value], rowIndex) => (
                                <motion.li
                                  key={name}
                                  initial={{ opacity: 0, x: reversed ? -24 : 24 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, margin: '-40px' }}
                                  transition={{ duration: 0.6, delay: 0.25 + rowIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 px-3.5 py-2.5 text-xs"
                                >
                                  <span className="font-medium text-slate-800 dark:text-slate-200">{name}</span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap">{value}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  </div>
                </Scroll3D>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
