import React from 'react';

interface CloudMeshLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  textPosition?: 'right' | 'bottom';
  anchorDotId?: string;
}

export const CloudMeshLogo: React.FC<CloudMeshLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textPosition = 'right',
  anchorDotId
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28'
  }[size];

  const titleSizes = {
    sm: 'text-sm font-extrabold tracking-wider',
    md: 'text-base font-extrabold tracking-wider',
    lg: 'text-xl font-extrabold tracking-wider',
    xl: 'text-2xl font-extrabold tracking-wider',
    '2xl': 'text-3xl font-extrabold tracking-wider'
  }[size];

  const subtitleSizes = {
    sm: 'text-[7.5px] font-semibold tracking-[0.25em]',
    md: 'text-[9px] font-semibold tracking-[0.25em]',
    lg: 'text-[11px] font-semibold tracking-[0.28em]',
    xl: 'text-[13px] font-semibold tracking-[0.28em]',
    '2xl': 'text-[15px] font-semibold tracking-[0.3em]'
  }[size];

  return (
    <div
      className={`inline-flex items-center ${
        textPosition === 'bottom' ? 'flex-col text-center gap-3' : 'flex-row gap-3.5'
      } ${className}`}
    >
      {/* Official Interwoven Mesh Cloud Icon */}
      <div className={`relative shrink-0 ${iconDimensions} flex items-center justify-center`}>
        <svg
          viewBox="0 0 160 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(6,182,212,0.35)]"
        >
          <defs>
            {/* Main Gradient: Deep Sky Blue -> Vibrant Cyan -> Mint / Emerald Green */}
            <linearGradient id="cmGradA" x1="15%" y1="85%" x2="85%" y2="15%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="30%" stopColor="#0ea5e9" />
              <stop offset="60%" stopColor="#06b6d4" />
              <stop offset="85%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <linearGradient id="cmGradB" x1="85%" y1="15%" x2="15%" y2="85%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="25%" stopColor="#2dd4bf" />
              <stop offset="55%" stopColor="#06b6d4" />
              <stop offset="80%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            <linearGradient id="cmGradLoop" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Cloud Outline & Primary Outer Curves */}
          <path
            d="M 44 88 C 24 88 12 72 16 52 C 20 34 38 28 52 38 C 58 20 80 16 96 26 C 110 36 112 52 106 62 C 124 58 138 72 134 86 C 130 98 116 102 104 96 C 92 90 84 76 74 66 C 64 56 50 56 42 66 C 36 74 38 86 48 88 Z"
            stroke="url(#cmGradA)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Intertwined Inner Ribbon & Infinity Loops */}
          <path
            d="M 46 64 C 40 48 54 36 68 44 C 82 52 92 72 106 78 C 120 84 130 76 128 64 C 126 50 112 44 100 52 C 86 62 76 82 60 84 C 46 86 36 78 40 64 C 44 50 60 48 72 58 C 84 68 98 66 106 58"
            stroke="url(#cmGradB)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Loop Connection for the woven depth */}
          <path
            d="M 64 42 C 78 34 94 40 102 54 C 110 68 106 82 94 88 C 82 94 70 86 64 74 C 58 62 62 48 76 46 C 88 44 100 54 104 68"
            stroke="url(#cmGradLoop)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Bright Energy Core Node */}
          <circle cx="82" cy="62" r="4.5" fill="#e0f2fe" className="animate-pulse" />
        </svg>

        {/* Traveling Dot Anchor located right on the logo mark */}
        {anchorDotId && (
          <span
            id={anchorDotId}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-sm bg-sky-500/20 dark:bg-sky-400/30 border border-sky-500/50 dark:border-sky-400/60 rotate-45 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Official Typography Branding */}
      {showText && (
        <div className="flex flex-col select-none text-left">
          <span className={`text-slate-900 dark:text-white leading-tight ${titleSizes}`}>
            CLOUDMESH
          </span>
          <span className={`text-slate-500 dark:text-slate-400 uppercase mt-0.5 leading-tight ${subtitleSizes}`}>
            DIGITAL SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};
