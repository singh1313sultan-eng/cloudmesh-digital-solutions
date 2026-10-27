import React from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';

type ShapeKind = 'cube' | 'ring' | 'sphere';

export interface ShapeConfig {
  kind: ShapeKind;
  /** CSS position within the parent section, e.g. { top: '10%', left: '4%' }. */
  position: React.CSSProperties;
  size: number;
  /** Parallax travel in px across a full page scroll; negative moves up faster. */
  speed?: number;
  /** Seconds per full rotation. */
  spin?: number;
}

const CUBE_FACES = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)'
];

/** True CSS 3D cube: six translucent gradient faces spinning on two axes. */
const Cube: React.FC<{ size: number; spin: number }> = ({ size, spin }) => (
  <div className="[perspective:600px]" style={{ width: size, height: size }}>
    <div className="shape-spin relative h-full w-full [transform-style:preserve-3d]" style={{ animationDuration: `${spin}s` }}>
      {CUBE_FACES.map(face => (
        <div
          key={face}
          className="absolute inset-0 rounded-[18%] border border-sky-300/60 dark:border-sky-400/40 bg-gradient-to-br from-sky-400/25 via-cyan-300/15 to-emerald-300/25 dark:from-sky-500/20 dark:via-cyan-500/10 dark:to-emerald-500/20 backdrop-blur-[2px] shadow-[inset_0_0_24px_rgba(56,189,248,0.25)]"
          style={{ transform: `${face} translateZ(${size / 2}px)` }}
        />
      ))}
    </div>
  </div>
);

/** Orbit ring tipped in perspective and spinning, with a satellite riding on it. */
const Ring: React.FC<{ size: number; spin: number }> = ({ size, spin }) => (
  <div className="[perspective:800px]" style={{ width: size, height: size }}>
    <div className="h-full w-full [transform-style:preserve-3d]" style={{ transform: 'rotateX(68deg) rotateY(-12deg)' }}>
      <div
        className="ring-spin relative h-full w-full rounded-full border-[3px] border-sky-400/50 dark:border-sky-300/40 shadow-[0_0_30px_rgba(56,189,248,0.35)]"
        style={{ animationDuration: `${spin}s` }}
      >
        <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-300 to-sky-500 shadow-[0_0_16px_rgba(16,185,129,0.8)]" />
      </div>
    </div>
  </div>
);

/** Lit glossy sphere. */
const Sphere: React.FC<{ size: number }> = ({ size }) => (
  <div
    className="rounded-full animate-float shadow-[0_30px_60px_-20px_rgba(2,132,199,0.45)]"
    style={{
      width: size,
      height: size,
      background:
        'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(125,211,252,0.85) 22%, rgba(14,165,233,0.85) 50%, rgba(8,47,73,0.95) 100%)'
    }}
  />
);

const Shape: React.FC<{ shape: ShapeConfig; progress: MotionValue<number> }> = ({ shape, progress }) => {
  const y = useTransform(progress, [0, 1], [0, shape.speed ?? -200]);
  const rotate = useTransform(progress, [0, 1], [0, (shape.speed ?? -200) / 4]);
  const spin = shape.spin ?? 18;
  return (
    <motion.div className="absolute" style={{ ...shape.position, y, rotate }}>
      {shape.kind === 'cube' && <Cube size={shape.size} spin={spin} />}
      {shape.kind === 'ring' && <Ring size={shape.size} spin={spin} />}
      {shape.kind === 'sphere' && <Sphere size={shape.size} />}
    </motion.div>
  );
};

/** Decorative 3D objects drifting behind a section's content with scroll parallax. */
export const FloatingShapes: React.FC<{ shapes: ShapeConfig[]; className?: string }> = ({ shapes, className = '' }) => {
  const { scrollYProgress } = useScroll();
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map((shape, i) => (
        <Shape key={i} shape={shape} progress={scrollYProgress} />
      ))}
    </div>
  );
};
