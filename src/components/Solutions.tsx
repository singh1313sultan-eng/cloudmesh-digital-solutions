import React from 'react';
import { 
  Globe, 
  LayoutDashboard, 
  UtensilsCrossed, 
  Smartphone, 
  ArrowRight,
  CheckCircle2,
  ChefHat,
  ShoppingBag,
  Bell,
  Users,
  Shield,
  Clock
} from 'lucide-react';
import { SolutionType } from '../types/index.ts';
import { ScrollReveal } from './ScrollReveal.tsx';

interface SolutionsProps {
  onSelectSolutionDemo: (type: SolutionType) => void;
  onOpenInquiry: (solution?: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ 
  onSelectSolutionDemo,
  onOpenInquiry
}) => {
  return (
    <section id="solutions" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <span
                id="dot-anchor-solutions"
                className="w-2.5 h-2.5 rounded-sm border border-sky-500/40 dark:border-sky-400/40 rotate-45 inline-block shrink-0"
                aria-hidden="true"
              />
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
              Everything your business needs to operate and grow online.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We build straightforward, high-quality digital solutions tailored to how you work. No unnecessary complexity, no confusing technical jargon.
            </p>
          </div>
        </ScrollReveal>

        {/* 1. WEBSITES FOR ANY BUSINESS */}
        <div id="websites" className="pt-4 scroll-mt-28">
          <ScrollReveal direction="up" delayMs={60}>
            <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    <Globe className="w-4 h-4" />
                    <span>01. Modern Websites</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Clean, fast websites for any business.
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    A professional website that looks great on mobile phones, tablets, and desktop computers. Built to showcase your services, build trust with customers, and make it effortless for people to call, message, or visit you.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Mobile-first responsive design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Contact & quote request forms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Fast loading with search optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Google Maps location & social links</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <button
                      onClick={() => onOpenInquiry('Custom Website')}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 rounded-lg transition-colors inline-flex items-center gap-2 active:scale-95 shadow-sm"
                    >
                      Build a Website for My Business
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectSolutionDemo('website')}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                    >
                      View Live Preview
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                    <span>Website Features Included</span>
                    <span className="text-sky-600 dark:text-sky-400 font-normal">All Devices</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Custom Brand Design</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Included</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Secure Contact & Inquiry Forms</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Instant Email Alert</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Google Search Ready</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Optimized</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Domain & Cloud Setup</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Fully Handled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. ADMIN PORTALS FOR ANY BUSINESS */}
        <div id="portals" className="pt-4 scroll-mt-28">
          <ScrollReveal direction="up" delayMs={60}>
            <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>02. Business Portals</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Admin portals for any business.
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Stop drowning in spreadsheets and manual paperwork. We create custom admin portals and dashboards where business owners and staff can manage incoming customer requests, orders, inventory, schedules, and documents from any browser.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Centralized order & booking dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Customer & client contact records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Inventory stock & item availability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Staff logins with permissions</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <button
                      onClick={() => onOpenInquiry('Business Admin Portal')}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 dark:bg-teal-400 dark:hover:bg-teal-300 dark:text-slate-950 rounded-lg transition-colors inline-flex items-center gap-2 active:scale-95 shadow-sm"
                    >
                      Get an Admin Portal for My Business
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectSolutionDemo('business-portal')}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                    >
                      View Live Portal Demo
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                    <span>What You Can Manage</span>
                    <span className="text-teal-600 dark:text-teal-400 font-normal">All in One Place</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Customer Records & Inquiries</span>
                      <span className="text-slate-500 dark:text-slate-400">Searchable</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Order & Project Stages</span>
                      <span className="text-slate-500 dark:text-slate-400">Live Status</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Role-Based Access (Owner vs Staff)</span>
                      <span className="text-slate-500 dark:text-slate-400">Secure</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-slate-200">Invoices, Receipts & Files</span>
                      <span className="text-slate-500 dark:text-slate-400">Organized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 3. MOBILE APPS FOR FOOD SHOPS, FOOD CARTS & OPERATIONS */}
        <div id="mobile-apps" className="pt-4 scroll-mt-28">
          <ScrollReveal direction="up" delayMs={60}>
            <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>03. Food Shops & Food Carts</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Mobile apps for business owners and food operations.
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Whether you operate a food cart, food truck, takeaway shop, cafe, or restaurant, we build custom apps to run your daily operations smoothly. Customers can browse your menu and order ahead, while your kitchen screen shows incoming orders instantly.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Live Kitchen Display Screen (KDS)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Contactless QR & takeaway ordering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>"Order Ready" phone alert notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Zero third-party commission fees</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <button
                      onClick={() => onOpenInquiry('Food Shop / Cart App')}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 rounded-lg transition-colors inline-flex items-center gap-2 active:scale-95 shadow-sm"
                    >
                      Get an App for My Food Shop or Cart
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectSolutionDemo('food-saas')}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                    >
                      Try Food Ordering Demo
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                    <span>How Food Carts & Shops Use It</span>
                    <span className="text-sky-600 dark:text-sky-400 font-normal">Fast & Simple</span>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        Customer Orders on Phone
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Customers view your digital menu, select options, and place pickup or counter orders without waiting in long queues.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Kitchen Sees Order Immediately
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Kitchen screen dings with new items. Cook marks items "Preparing" and "Ready" with a simple tap.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Customer Notified for Pickup
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        An instant notification alerts the customer to collect their hot food from your counter or food cart window.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
