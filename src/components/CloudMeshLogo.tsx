import React, { useId } from 'react';

interface CloudMeshLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  textPosition?: 'right' | 'bottom';
}

const ICON_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
  '2xl': 'w-28 h-28'
};

const TITLE_SIZES = {
  sm: 'text-[17px]',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl'
};

const SUBTITLE_SIZES = {
  sm: 'text-[7.5px] tracking-[0.32em]',
  md: 'text-[9px] tracking-[0.32em]',
  lg: 'text-[11px] tracking-[0.34em]',
  xl: 'text-[13px] tracking-[0.34em]',
  '2xl': 'text-[15px] tracking-[0.36em]'
};

/** Cloud silhouette and the three-node mesh drawn inside it (48×48 grid). */
const CLOUD_PATH = 'M14.5 36 A8.5 8.5 0 0 1 13.2 19.1 A11 11 0 0 1 34.4 17.6 A9.3 9.3 0 0 1 35 36 Z';
const MESH_NODES: [number, number][] = [
  [16.5, 30],
  [24, 19.5],
  [31.5, 30]
];

/** Mark: a gradient cloud carrying a connected node mesh — cloud + mesh. */
export const CloudMeshMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Unique gradient id so several logos can share a page.
  const gradientId = `${useId().replace(/:/g, '')}-cloud`;
  const [a, b, c] = MESH_NODES;

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0.1" y1="0.1" x2="0.9" y2="0.9">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="55%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path d={CLOUD_PATH} fill={`url(#${gradientId})`} />
      <path
        className="mesh-edge"
        d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]} Z`}
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {MESH_NODES.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          className="mesh-node"
          style={{ animationDelay: `${i * 0.8}s` }}
          cx={x}
          cy={y}
          r="2.4"
          fill="white"
        />
      ))}
    </svg>
  );
};

export const CloudMeshLogo: React.FC<CloudMeshLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textPosition = 'right'
}) => (
  <div
    className={`inline-flex items-center ${
      textPosition === 'bottom' ? 'flex-col text-center gap-3' : 'flex-row gap-2.5'
    } ${className}`}
  >
    <CloudMeshMark className={`cloud-mark shrink-0 ${ICON_SIZES[size]}`} />

    {showText && (
      <div className="flex flex-col select-none text-left leading-none">
        <span className={`font-extrabold tracking-[-0.03em] text-slate-900 dark:text-white ${TITLE_SIZES[size]}`}>
          Cloud<span className="accent-serif font-normal text-sky-600 dark:text-sky-300 pl-[1px]">mesh</span>
        </span>
        <span className={`mt-1 font-semibold uppercase text-slate-500 dark:text-slate-400 ${SUBTITLE_SIZES[size]}`}>
          Digital Solutions
        </span>
      </div>
    )}
  </div>
);
