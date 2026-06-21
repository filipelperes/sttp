import { memo, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Tip pools — different messages per viewport width                  */
/* ------------------------------------------------------------------ */

const TIPS_DESKTOP = [
  'Ctrl+K — open palette',
  'Tab ↹ — autocomplete',
  'Esc — close palette',
  'Type anywhere to search',
];

const TIPS_TABLET = [
  'Tap the search button to start',
  'Swipe down to open palette',
  'Tap a suggestion to select it',
  'Tap outside to close',
];

const TIPS_MOBILE = [
  'Tap to search',
  'Swipe down for palette',
  'Tap suggestion to select',
  'Swipe to scroll',
];

/* ------------------------------------------------------------------ */
/*  Hook: detect breakpoint from window.matchMedia                    */
/* ------------------------------------------------------------------ */

type Bp = 'mobile' | 'tablet' | 'desktop';

const useBreakpoint = (): Bp => {
  const [bp, setBp] = useState<Bp>('desktop');

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 639px)');
    const mqTablet = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');

    const update = () => {
      if (mqMobile.matches) setBp('mobile');
      else if (mqTablet.matches) setBp('tablet');
      else setBp('desktop');
    };

    update();
    mqMobile.addEventListener('change', update);
    mqTablet.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqTablet.removeEventListener('change', update);
    };
  }, []);

  return bp;
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const TIP_INTERVAL_MS = 4_500;
const FADE_DURATION_MS = 600;

const Tips = memo(() => {
  const bp = useBreakpoint();
  const pool = bp === 'mobile' ? TIPS_MOBILE : bp === 'tablet' ? TIPS_TABLET : TIPS_DESKTOP;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cycle tip: fade out, swap, fade in
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % pool.length);
        setVisible(true);
      }, FADE_DURATION_MS);
    }, TIP_INTERVAL_MS);
    return () => clearInterval(t);
  }, [pool.length]);

  return (
    <p
      className="text-center select-none transition-opacity pointer-events-none"
      style={{
        fontSize: 'clamp(10px, 1.4vw, 13px)',
        opacity: visible ? 0.35 : 0,
        transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        marginTop: 'clamp(2px, 0.5vh, 8px)',
      }}
    >
      {pool[index]}
    </p>
  );
});

Tips.displayName = 'Tips';
export default Tips;
