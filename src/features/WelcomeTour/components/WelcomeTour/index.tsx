import { memo, useCallback, useEffect, useState } from 'react';
import {
  IoTimeOutline,
  IoSearch,
  IoChevronForward,
  IoChevronBack,
  IoArrowForward,
  IoHandLeft,
  IoColorPaletteOutline,
  IoClose,
  IoColorFillOutline,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { isTourDismissed, dismissTour, resetTour } from '@/features/WelcomeTour/utils/tourStorage';
import useTourStore from '@/features/WelcomeTour/stores/tourStore';

interface ITourStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  tip: string;
}

const STEPS: ITourStep[] = [
  {
    icon: <IoHandLeft size={32} />,
    title: 'Welcome to sttp.',
    description:
      'Your personalized startpage — a beautiful, fast launcher for your daily web services. Everything you need, one keystroke away.',
    tip: 'This short tour will walk you through everything sttp has to offer.',
  },
  {
    icon: <IoTimeOutline size={32} />,
    title: 'Time & Date',
    description:
      'Your current time and date are always visible. Customize the format, toggle seconds, switch 12h/24h, choose your locale, and adjust font sizes independently for clock and date.',
    tip: 'Open Settings → Clock or Settings → Date to personalize each.',
  },
  {
    icon: <IoSearch size={32} />,
    title: 'Command Palette',
    description:
      'Just start typing to search. Press Ctrl+K or type any key to open the palette. Autocomplete suggestions are highlighted with each service\'s own brand color as you type. Select a service and hit Enter to navigate — no mouse needed.',
    tip: 'Try typing "youtube" or "github" to see brand colors in action.',
  },
  {
    icon: <IoColorFillOutline size={32} />,
    title: '12 Accent Targets',
    description:
      'The Accent tab gives you granular control over 12 UI elements: clock digits, colon separator, date text, icons, tabs, toggles, sliders, focus ring, scrollbar, glass borders, button borders, and the text cursor. Each can independently use your accent color.',
    tip: 'Open Settings → Accent to customize each target.',
  },
  {
    icon: <IoBookmarkOutline size={32} />,
    title: 'Settings Profiles',
    description:
      'Save your entire settings configuration as a named profile. Set one as your startup default — it loads every time you open the page. Load profiles with one click, export them as JSON, or import from other devices.',
    tip: 'Go to Settings → Profiles and click the star to set your startup default.',
  },
  {
    icon: <IoColorPaletteOutline size={32} />,
    title: 'Themes & Customization',
    description:
      'Switch light/dark themes, pick from 10 accent presets or choose any custom color. Adjust glass intensity, background dim, and tweak every detail. All changes save automatically — nothing to lose.',
    tip: 'Settings → Appearance has everything you need.',
  },
  {
    icon: <IoColorPaletteOutline size={32} />,
    title: 'Search Engines & Services',
    description:
      'Built-in support for Google, DuckDuckGo, Bing, and more. Add your own search engines and web services with custom icons, colors, and URL templates — all saved to your browser.',
    tip: 'Open Settings → Search or Settings → Services to add yours.',
  },
  {
    icon: <IoHandLeft size={32} />,
    title: 'Mobile Friendly',
    description:
      'sttp works great on mobile too! Use the floating search button, swipe down from the top to open the palette, or just tap to navigate. Everything adapts to your screen.',
    tip: 'Swipe down on your phone to open the command palette instantly.',
  },
];

const WelcomeTour = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const showSignal = useTourStore((s) => s.showSignal);

  useEffect(() => {
    // Show on every startup unless permanently dismissed
    if (!isTourDismissed()) {
      const timer = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, [showSignal]);

  const closeTour = useCallback((permanentDismiss: boolean) => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
      if (permanentDismiss) dismissTour();
      else resetTour(); // Reset so it shows next startup again
    }, 200);
  }, []);

  /** Close without permanent dismiss → shows on next startup. */
  const handleClose = useCallback(() => closeTour(false), [closeTour]);

  /** Close with permanent dismiss. */
  const handleDismiss = useCallback(() => closeTour(true), [closeTour]);

  const handleNext = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleDismiss();
    }
  }, [step, handleDismiss]);

  const handlePrev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose],
  );

  if (!isOpen) return null;

  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ animation: closing ? 'fade-out 0.2s ease-in forwards' : 'fade-in 0.25s ease-out' }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl glass-strong animate-scale-in overflow-hidden"
        style={{ animation: closing ? 'scale-in 0.15s ease-out reverse' : undefined }}
      >
        {/* Header row */}
        <div className="flex items-center justify-end px-6 pt-4 pb-1">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground hover:bg-surface-hover cursor-pointer transition-all focus-ring"
            aria-label="Close tour"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* Step indicator bar */}
        <div className="flex gap-1.5 px-6 pb-3">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                i === step ? 'bg-accent' : i < step ? 'bg-accent/40' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-4" key={step}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl glass flex items-center justify-center text-accent">
              {current.icon}
            </div>
            <span className="text-xs text-foreground/30 tabular-nums mt-1">
              {step + 1} / {STEPS.length}
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2">{current.title}</h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">{current.description}</p>

          <div className="glass rounded-lg px-3.5 py-2.5 flex items-start gap-2.5">
            <IoArrowForward size={14} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-xs text-foreground/60 leading-relaxed">{current.tip}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-2 flex flex-col gap-3">
          {/* Don't show again checkbox */}
          <label className="flex items-center gap-2 cursor-pointer self-start">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-muted accent-accent cursor-pointer"
            />
            <span className="text-[11px] text-foreground/40 select-none">Don&apos;t show again</span>
          </label>

          <div className="flex items-center justify-between">
            <button
              onClick={handleClose}
              className="px-3 py-1.5 rounded-lg text-xs text-foreground/40 hover:text-foreground/70 cursor-pointer transition-all focus-ring"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg glass text-xs transition-all focus-ring ${
                  isFirst
                    ? 'text-foreground/20 opacity-30 cursor-not-allowed'
                    : 'text-foreground/60 hover:text-foreground cursor-pointer'
                }`}
                disabled={isFirst}
              >
                <IoChevronBack size={14} />
                Back
              </button>
              <button
                onClick={dontShowAgain ? handleDismiss : handleNext}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all focus-ring ${
                  isLast || dontShowAgain
                    ? 'bg-accent text-accent-foreground hover:opacity-90'
                    : 'glass text-foreground/80 hover:text-foreground'
                }`}
              >
                {dontShowAgain ? 'Got it' : isLast ? 'Finish' : 'Next'}
                {!isLast && !dontShowAgain && <IoChevronForward size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

WelcomeTour.displayName = 'WelcomeTour';
export default WelcomeTour;
