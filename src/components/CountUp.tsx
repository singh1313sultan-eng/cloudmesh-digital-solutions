import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  to: number;
  suffix?: string;
  durationS?: number;
}

/** Counts from 0 to `to` the first time it scrolls into view. */
export const CountUp: React.FC<CountUpProps> = ({ to, suffix = '', durationS = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, to, {
      duration: durationS,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
    return () => controls.stop();
  }, [inView, reducedMotion, to, suffix, durationS]);

  return (
    <span ref={ref} className="tabular-nums">
      {reducedMotion ? to : 0}
      {suffix}
    </span>
  );
};
