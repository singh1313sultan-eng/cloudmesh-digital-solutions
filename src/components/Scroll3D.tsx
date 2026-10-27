import React, { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface Scroll3DProps {
  children: ReactNode;
  className?: string;
  /** Starting tilt in degrees; the content flattens to 0 as it scrolls into place. */
  tilt?: number;
  /** 'x' tips the content back like a screen being raised; 'left'/'right' swing it in on the Y axis. */
  axis?: 'x' | 'left' | 'right';
}

/**
 * Scroll-scrubbed 3D entrance: content starts tilted away in perspective and
 * rotates flat as it travels up the viewport. Tied to scroll position, so it
 * reverses when scrolling back up.
 */
export const Scroll3D: React.FC<Scroll3DProps> = ({ children, className = '', tilt = 18, axis = 'x' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });

  const angle = useTransform(scrollYProgress, [0, 1], [axis === 'right' ? -tilt : tilt, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.15, 1]);

  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div
        className="h-full"
        style={{
          ...(axis === 'x' ? { rotateX: angle } : { rotateY: angle }),
          scale,
          y,
          opacity,
          transformOrigin: axis === 'x' ? '50% 100%' : axis === 'left' ? '0% 50%' : '100% 50%'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
