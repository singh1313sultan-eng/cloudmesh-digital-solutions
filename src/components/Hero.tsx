import React from 'react';
import { ArrowRight, Globe, LayoutDashboard, Smartphone, ShieldCheck, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal.tsx';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';

interface HeroProps {
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Subtle ambient background glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-200/40 via-teal-100/30 to-slate-200/50 dark:from-sky-950/30 dark:via-slate-900/40 dark:to-teal-950/20 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delayMs={50}>
          {/* Simple trust markers without numbers */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Auckland, New Zealand
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>Registered Digital Solutions Company</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>Worldwide Delivery</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delayMs={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] [text-wrap:balance]">
                Websites, admin portals, and mobile apps built for your business.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={160}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                CloudMesh Digital Solutions creates clean, reliable software that helps business owners run daily operations smoothly—from modern marketing websites and custom business portals to mobile apps for food shops, food carts, and service businesses.
              </p>
            </ScrollReveal>

            {/* What we deliver highlight pills */}
            <ScrollReveal direction="up" delayMs={200}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 shadow-xs">
                  <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Custom Websites</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 shadow-xs">
                  <LayoutDashboard className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Business Admin Portals</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 shadow-xs">
                  <Smartphone className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Food Shop & Cart Apps</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Primary Action Row */}
            <ScrollReveal direction="up" delayMs={240}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#websites"
                  className="px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 rounded-md transition-all shadow-sm shadow-sky-500/20 inline-flex items-center gap-2 active:scale-95 whitespace-nowrap"
                >
                  Explore What We Build
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onOpenInquiry}
                  className="px-6 py-3 text-sm font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 dark:text-slate-200 dark:hover:text-white dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:border-slate-700/80 rounded-md transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-sm"
                >
                  Tell Us About Your Project
                </button>
              </div>
            </ScrollReveal>

            {/* Key commitments without numbers */}
            <ScrollReveal direction="up" delayMs={280}>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  Works seamlessly on phones & computers
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  Custom made for your business workflow
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  Full ownership of your software
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual Card: Clean preview of what we do */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delayMs={200}>
              <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl dark:shadow-2xl dark:shadow-black/40 relative overflow-hidden transition-colors">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <CloudMeshLogo size="sm" showText={false} />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      CloudMesh
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">|</span>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Solutions Suite
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Ready to Deploy
                  </span>
                </div>

                <div className="py-4 space-y-4">
                  {/* Pillar 1: Modern Websites */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Websites</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Fast, modern websites designed to show what your business does and turn visitors into paying customers.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2: Business Admin Portals */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Admin Portals for Any Business</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Secure web portals to manage your orders, customer lists, inventory, staff tasks, and reports in one place.
                      </p>
                    </div>
                  </div>

                  {/* Pillar 3: Food Shop & Food Cart Mobile Apps */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Mobile Apps for Food Shops & Carts</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Custom apps for owners, kitchen screens, and customers. Take takeaway orders, manage menus, and handle queues right from your phone.
                      </p>
                    </div>
                  </div>

                  {/* Fast Action */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenInquiry}
                      className="w-full py-2.5 text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/50 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/80 rounded-lg transition-colors text-center block"
                    >
                      Request a Consultation with Our Team →
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
