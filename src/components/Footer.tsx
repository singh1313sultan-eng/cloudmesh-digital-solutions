import React from 'react';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';
import { CONTACT_EMAIL, NAV_LINKS } from '../data/site.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-400 text-sm overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          <div className="md:col-span-6 space-y-5">
            <a href="#top" className="inline-block dark" aria-label="CloudMesh Digital Solutions home">
              <CloudMeshLogo size="md" />
            </a>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white max-w-md leading-snug">
              Crafting digital products <span className="accent-serif text-sky-300">with care,</span> from Auckland to the world.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Explore</div>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contact</div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="block text-white font-medium hover:text-sky-300 transition-colors">
              {CONTACT_EMAIL}
            </a>
            <p className="leading-relaxed">
              Auckland, New Zealand
              <br />
              Registered in New Zealand
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} CloudMesh Digital Solutions Ltd. All rights reserved.</div>
          <a href="#top" className="hover:text-white transition-colors">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
