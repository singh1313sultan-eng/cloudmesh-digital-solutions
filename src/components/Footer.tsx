import React from 'react';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 py-16 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#"
              className="inline-block transition-transform active:scale-98"
              aria-label="CloudMesh Digital Solutions Home"
            >
              <CloudMeshLogo size="md" />
            </a>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs max-w-sm pt-1">
              We design and build modern websites, business admin portals, and custom mobile apps for business owners and daily operations—including food shops, cafes, and food carts.
            </p>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1">
              <div>Registered in New Zealand</div>
              <div>Auckland CBD, New Zealand</div>
            </div>
          </div>

          {/* Solutions Column (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              What We Build
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#websites" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Websites for Growing Businesses
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Business Admin & Operations Portals
                </a>
              </li>
              <li>
                <a href="#mobile-apps" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Food Shop, Food Cart & Takeaway Apps
                </a>
              </li>
              <li>
                <a href="#interactive-showcase" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Kitchen Display Screens (KDS) & Order Alerts
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Direct Contact
            </div>
            <div className="text-xs space-y-1">
              <div className="text-slate-800 dark:text-slate-300 font-medium">hello@cloudmesh.co.nz</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] pt-1 leading-relaxed">
                Auckland, New Zealand<br />
                Working with clients locally and worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} CloudMesh Digital Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Inquire</a>
            <span aria-hidden="true">·</span>
            <a href="#websites" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Websites</a>
            <span aria-hidden="true">·</span>
            <a href="#mobile-apps" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Food Apps</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
