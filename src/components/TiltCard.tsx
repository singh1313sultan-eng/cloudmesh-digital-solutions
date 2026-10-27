import React, { useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card edges. */
  maxTilt?: number;
}

/**
 * Perspective tilt that follows the pointer, with a soft glare highlight.
 * Writes CSS variables directly so pointer movement never re-renders React.
 */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', maxTilt = 7 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--ry', `${(px - 0.5) * maxTilt * 2}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * maxTilt * 2}deg`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
    el.dataset.active = 'true';
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.dataset.active = 'false';
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`tilt relative ${className}`}
    >
      {children}
      <div aria-hidden="true" className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" />
    </div>
  );
};
