import React, { Suspense, lazy } from 'react';
import { ShieldCheck, Smartphone, Zap, HeartHandshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';
import { SectionHeading } from './SectionHeading.tsx';
import { TiltCard } from './TiltCard.tsx';
import { Scroll3D } from './Scroll3D.tsx';

const NetworkGlobe = lazy(() => import('./NetworkGlobe.tsx'));

const HIGHLIGHTS = [
  {
    icon: Smartphone,
    title: 'Works on every device',
    desc: 'iPhone, Android, tablet or desktop — every website, portal and app adapts smoothly to the screen.'
  },
  {
    icon: Zap,
    title: 'Fast & reliable',
    desc: 'Clean, optimised code on modern edge infrastructure, so pages and order screens load instantly.'
  },
  {
    icon: ShieldCheck,
    title: 'Safe & secure',
    desc: 'Encrypted connections, role-based access and regular backups protect your customer and business data.'
  },
  {
    icon: HeartHandshake,
    title: 'Local NZ support',
    desc: 'Auckland-based and easy to reach. You talk directly with the engineers building your software.'
  }
];

export const Architecture: React.FC = () => {
  return (
    <section id="architecture" className="relative py-24 sm:py-32 bg-slate-950 text-white overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-sky-600/20 blur-[140px]"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading
              eyebrow="Built Right · Delivered Worldwide"
              title={
                <>
                  Reliable software that works <span className="accent-serif text-gradient">when you need it.</span>
                </>
              }
              description="Engineered in Auckland, served from the edge to customers around the world. Drag the globe to explore our reach."
            />
            <ScrollReveal direction="up" delayMs={200}>
              <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium text-slate-300">
                {['Edge-hosted on Cloudflare', 'Encrypted connections', 'Monitored & backed up'].map(tag => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <Scroll3D axis="right" tilt={25}>
            <div className="relative aspect-square w-full max-w-[560px] mx-auto">
              <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-sky-500/20 blur-3xl" />
              <Suspense fallback={null}>
                <NetworkGlobe />
              </Suspense>
            </div>
          </Scroll3D>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} direction="up" delayMs={100 + idx * 80}>
                <TiltCard className="h-full rounded-3xl" maxTilt={12}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm [transform-style:preserve-3d]">
                    <div className="tilt-pop mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400 text-white shadow-lg shadow-sky-500/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
