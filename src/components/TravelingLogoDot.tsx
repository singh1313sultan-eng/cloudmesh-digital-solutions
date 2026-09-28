import React, { useState, useEffect, useRef } from 'react';

interface AnchorItem {
  id: string;
  name: string;
}

const ANCHORS: AnchorItem[] = [
  { id: 'logo-dot-anchor', name: 'Header Logo' },
  { id: 'dot-anchor-solutions', name: 'What We Do' },
  { id: 'dot-anchor-showcase', name: 'Interactive Test Environment' },
  { id: 'dot-anchor-estimator', name: 'How We Work With You' },
  { id: 'dot-anchor-architecture', name: 'Built Right for Your Business' },
  { id: 'dot-anchor-casestudies', name: 'Real Business Solutions' },
  { id: 'dot-anchor-contact', name: 'Get in Touch' }
];

export const TravelingLogoDot: React.FC = () => {
  const [activeAnchorId, setActiveAnchorId] = useState<string>('logo-dot-anchor');
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isGliding, setIsGliding] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const activeAnchorRef = useRef<string>('logo-dot-anchor');
  const isGlidingRef = useRef<boolean>(false);
  const glideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    activeAnchorRef.current = activeAnchorId;
  }, [activeAnchorId]);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      const currentScroll = window.scrollY;

      // Determine which anchor should be active
      let targetId = 'logo-dot-anchor';

      if (currentScroll >= 60) {
        // Check section elements in order
        const sectionMap: { sectionId: string; anchorId: string }[] = [
          { sectionId: 'solutions', anchorId: 'dot-anchor-solutions' },
          { sectionId: 'interactive-showcase', anchorId: 'dot-anchor-showcase' },
          { sectionId: 'scope-estimator', anchorId: 'dot-anchor-estimator' },
          { sectionId: 'architecture', anchorId: 'dot-anchor-architecture' },
          { sectionId: 'case-studies', anchorId: 'dot-anchor-casestudies' },
          { sectionId: 'contact', anchorId: 'dot-anchor-contact' }
        ];

        for (const item of sectionMap) {
          const el = document.getElementById(item.sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the section is currently in the active reading zone
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120) {
              targetId = item.anchorId;
            }
          }
        }
      }

      // If active anchor changed, trigger gliding animation!
      if (targetId !== activeAnchorRef.current) {
        activeAnchorRef.current = targetId;
        setActiveAnchorId(targetId);
        setIsGliding(true);
        isGlidingRef.current = true;

        if (glideTimeoutRef.current) {
          window.clearTimeout(glideTimeoutRef.current);
        }

        glideTimeoutRef.current = window.setTimeout(() => {
          setIsGliding(false);
          isGlidingRef.current = false;
          setShowPulse(true);
          setTimeout(() => setShowPulse(false), 700);
        }, 750);
      }

      // Fetch current target element's bounding rect
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        setCoords({
          x: rect.left,
          y: rect.top
        });
      }
    };

    const handleScrollOrResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    
    // Initial measure
    setTimeout(updatePosition, 100);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      cancelAnimationFrame(animationFrameId);
      if (glideTimeoutRef.current) {
        window.clearTimeout(glideTimeoutRef.current);
      }
    };
  }, []);

  if (!coords) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[60]"
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        transition: isGliding
          ? 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'none',
        willChange: 'transform'
      }}
      aria-hidden="true"
    >
      <div className="relative w-2.5 h-2.5 flex items-center justify-center">
        {/* Core Glowing Blue Diamond from Logo */}
        <div
          className={`w-2.5 h-2.5 rounded-sm bg-sky-500 dark:bg-sky-400 rotate-45 transform transition-transform duration-300 ${
            isGliding
              ? 'scale-135 shadow-[0_0_18px_rgba(14,165,233,1),0_0_30px_rgba(2,132,199,0.7)] ring-2 ring-white/90 dark:ring-white/60'
              : 'shadow-[0_0_10px_rgba(14,165,233,0.9)] dark:shadow-[0_0_10px_rgba(56,189,248,0.9)]'
          }`}
        >
          {/* Subtle inner core glint */}
          <div className="w-1 h-1 bg-white rounded-full absolute inset-0 m-auto"></div>
        </div>

        {/* Dynamic Comet Trail while gliding between screens */}
        {isGliding && (
          <div className="absolute -inset-1.5 rounded-full bg-sky-500/30 dark:bg-sky-400/25 blur-sm animate-pulse pointer-events-none"></div>
        )}

        {/* Arrival Ripple Wave when docking at each screen header */}
        {showPulse && !isGliding && (
          <div className="absolute -inset-2 rounded-full border border-sky-500 dark:border-sky-400 animate-ping pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};
