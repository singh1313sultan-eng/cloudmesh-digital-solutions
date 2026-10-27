import React, { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal.tsx';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = ''
}) => (
  <ScrollReveal direction="up" delayMs={50}>
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <div
        className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400 mb-4 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-sky-500" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] [text-wrap:balance]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed [text-wrap:pretty]">
          {description}
        </p>
      )}
    </div>
  </ScrollReveal>
);
