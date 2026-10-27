import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Globe, LayoutDashboard, Smartphone } from 'lucide-react';
import { PROJECTS, Project, ProjectKind } from '../data/projects.ts';
import { SectionHeading } from './SectionHeading.tsx';
import { TiltCard } from './TiltCard.tsx';

type Filter = 'all' | ProjectKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'website', label: 'Websites & Stores' },
  { id: 'portal', label: 'Portals & Dashboards' },
  { id: 'mobile', label: 'Mobile Apps' }
];

const KIND_ICON: Record<ProjectKind, React.ElementType> = {
  website: Globe,
  portal: LayoutDashboard,
  mobile: Smartphone
};

/** Stylised device mockup used when a project has no screenshot. */
const ProjectVisual: React.FC<{ project: Project }> = ({ project }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} screenshot`}
        loading="lazy"
        className="tilt-pop absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] rounded-xl object-cover object-top shadow-2xl"
      />
    );
  }

  if (project.kind === 'mobile') {
    return (
      <div className="tilt-pop absolute inset-0 flex items-center justify-center gap-4">
        {[0, 1].map(i => (
          <div
            key={i}
            className={`w-[30%] max-w-[120px] aspect-[9/19] rounded-[1.4rem] border-[5px] border-slate-900 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden ${
              i === 1 ? 'translate-y-6 rotate-6' : '-rotate-6'
            }`}
          >
            <div className={`h-1/3 bg-gradient-to-br ${project.accent} flex items-end p-2`}>
              <span className="text-[10px] font-bold text-white/90">{project.monogram}</span>
            </div>
            <div className="p-2 space-y-1.5">
              {[80, 60, 70, 45].map((w, j) => (
                <div key={j} className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" style={{ width: `${w}%` }} />
              ))}
              <div className={`mt-3 h-5 rounded-md bg-gradient-to-r ${project.accent} opacity-80`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="tilt-pop absolute inset-x-6 top-8 bottom-0 rounded-t-xl border border-white/30 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100 dark:border-slate-800">
        <span className="w-2 h-2 rounded-full bg-rose-400" />
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="ml-3 h-3 flex-1 max-w-[55%] rounded bg-slate-100 dark:bg-slate-800 text-[8px] leading-3 px-2 text-slate-400 truncate font-mono">
          {project.url?.replace('https://', '') ?? `${project.id}.app`}
        </span>
      </div>
      {project.kind === 'portal' ? (
        <div className="flex h-full">
          <div className="w-1/5 border-r border-slate-100 dark:border-slate-800 p-2 space-y-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full ${i === 0 ? `bg-gradient-to-r ${project.accent}` : 'bg-slate-200 dark:bg-slate-800'}`} />
            ))}
          </div>
          <div className="flex-1 p-3 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-8 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800" />
              ))}
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 50, 80, 60, 90, 72, 95].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t bg-gradient-to-t ${project.accent} opacity-80`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={`h-20 bg-gradient-to-br ${project.accent} flex items-center px-4`}>
            <span className="accent-serif text-2xl text-white drop-shadow">{project.name}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="space-y-1.5">
                <div className="aspect-square rounded-md bg-slate-100 dark:bg-slate-800" />
                <div className="h-1.5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const KindIcon = KIND_ICON[project.kind];
  const visualRef = useRef<HTMLDivElement>(null);
  // Mockup drifts against the scroll direction for a sense of depth.
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start end', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <TiltCard className="h-full rounded-3xl" maxTilt={5}>
      <article className="group/card h-full flex flex-col rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 dark:hover:shadow-black/40 transition-shadow duration-500 overflow-hidden [transform-style:preserve-3d]">
        <div ref={visualRef} className="relative h-56 sm:h-64 overflow-hidden [transform-style:preserve-3d]">
          <motion.div style={{ scale: backdropScale }} className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-90`} />
          <div className="absolute inset-0 bg-grid opacity-40 mix-blend-overlay" />
          <motion.div
            style={{ y: visualY }}
            className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-700 group-hover/card:scale-[1.04]"
          >
            <ProjectVisual project={project} />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col p-6 sm:p-7 gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <KindIcon className="w-3.5 h-3.5" />
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{project.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{project.summary}</p>

          <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            {project.highlights.map(h => (
              <li key={h} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.accent}`} />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map(s => (
                <span
                  key={s}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white"
              >
                Visit live site
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(opens {project.name} in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
};

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.kind === filter);

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Products we've <span className="accent-serif text-gradient">designed & shipped.</span>
              </>
            }
            description="Ordering platforms, enterprise dashboards and native mobile apps — built end-to-end by our team."
          />

          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2 shrink-0">
            {FILTERS.map(f => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-colors ${
                  filter === f.id
                    ? 'text-white dark:text-slate-950'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1200 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
