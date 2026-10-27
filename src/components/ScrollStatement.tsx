import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';

const STATEMENT: { text: string; accent?: boolean }[] = [
  { text: 'We partner with ambitious businesses to design, build and scale digital products —' },
  { text: 'websites, portals and apps that customers' },
  { text: 'love', accent: true },
  { text: 'and teams' },
  { text: 'rely on.', accent: true }
];

const WORDS = STATEMENT.flatMap(part => part.text.split(' ').map(word => ({ word, accent: part.accent })));

const Word: React.FC<{ progress: MotionValue<number>; index: number; word: string; accent?: boolean }> = ({
  progress,
  index,
  word,
  accent
}) => {
  const start = index / WORDS.length;
  const opacity = useTransform(progress, [start, start + 1 / WORDS.length], [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? 'accent-serif text-gradient' : undefined}>
        {word}
      </motion.span>{' '}
    </>
  );
};

/** Large statement whose words light up one by one as you scroll past. */
export const ScrollStatement: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  return (
    <section aria-label="About CloudMesh" className="bg-white dark:bg-slate-950 py-24 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          ref={ref}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.15] text-slate-900 dark:text-white [text-wrap:balance]"
        >
          {reducedMotion
            ? WORDS.map(({ word, accent }, i) => (
                <React.Fragment key={i}>
                  <span className={accent ? 'accent-serif text-gradient' : undefined}>{word}</span>{' '}
                </React.Fragment>
              ))
            : WORDS.map(({ word, accent }, i) => (
                <Word key={i} progress={scrollYProgress} index={i} word={word} accent={accent} />
              ))}
        </p>
      </div>
    </section>
  );
};
