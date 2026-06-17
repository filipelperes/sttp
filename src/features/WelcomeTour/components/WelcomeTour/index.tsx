import { memo, useCallback, useEffect, useState } from 'react';
import {
  IoTimeOutline,
  IoSearch,
  IoChevronForward,
  IoChevronBack,
  IoArrowForward,
  IoHandLeft,
  IoColorPaletteOutline,
} from 'react-icons/io5';
import { isTourDismissed, dismissTour } from '@/features/WelcomeTour/utils/tourStorage';

interface ITourStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string; // CSS selector to highlight
  tip: string;
}

const STEPS: ITourStep[] = [
  {
    icon: <IoHandLeft size={32} />,
    title: 'Welcome to sttp.',
    description:
      'Your personalized startpage — a beautiful, fast launcher for your daily web services. Everything you need, one keystroke away.',
    tip: 'This short tour will walk you through the essentials.',
  },
  {
    icon: <IoTimeOutline size={32} />,
    title: 'Time & Date',
    description:
      'Your current time and date are always visible. You can customize the format, toggle seconds, switch between 12h/24h, and choose your preferred locale.',
    tip: 'Click the gear icon → Clock / Date to personalize.',
  },
  {
    icon: <IoSearch size={32} />,
    title: 'Command Palette',
    description:
      'Just start typing to search. Press Ctrl+K or type any key to open the palette. Select a service and hit Enter to navigate — no mouse needed.',
    tip: 'Try typing "youtube" or "github" to see it in action.',
  },
  {
    icon: <IoColorPaletteOutline size={32} />,
    title: 'Full Customization',
    description:
      'Switch between light and dark themes, adjust the glass intensity, dim the background, manage your services, and tweak every detail to match your style.',
    tip: 'All changes save automatically — experiment freely!',
  },
];

const WelcomeTour = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Show tour on first visit with a small delay so the app renders first
    if (!isTourDismissed()) {
      const timer = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
      if (dontShowAgain) dismissTour();
    }, 200);
  }, [dontShowAgain]);

  const handleNext = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleClose();
    }
  }, [step, handleClose]);

  const handlePrev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
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
      {/* Main card */}
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl glass-strong animate-scale-in overflow-hidden"
        style={{ animation: closing ? 'scale-in 0.15s ease-out reverse' : undefined }}
      >
        {/* Step indicator bar */}
        <div className="flex gap-1.5 px-6 pt-5 pb-2">
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
          {/* Icon + Step number */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl glass flex items-center justify-center text-accent">
              {current.icon}
            </div>
            <span className="text-xs text-foreground/30 tabular-nums mt-1">
              {step + 1} / {STEPS.length}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-2">{current.title}</h3>

          {/* Description */}
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">{current.description}</p>

          {/* Tip */}
          <div className="glass rounded-lg px-3.5 py-2.5 flex items-start gap-2.5">
            <IoArrowForward size={14} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-xs text-foreground/60 leading-relaxed">{current.tip}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-2 flex items-center justify-between">
          {/* Don't show again */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <button
              onClick={() => setDontShowAgain((v) => !v)}
              className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                dontShowAgain
                  ? 'bg-accent border-accent'
                  : 'border-muted-foreground/30 hover:border-muted-foreground/60'
              }`}
            >
              {dontShowAgain && (
                <svg viewBox="0 0 12 12" className="w-3 h-3 fill-white">
                  <path d="M3 6l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </button>
            <span className="text-[11px] text-foreground/40 group-hover:text-foreground/60 transition-colors select-none">
              Don&apos;t show this again
            </span>
          </label>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass text-xs text-foreground/60 hover:text-foreground cursor-pointer transition-all focus-ring"
              >
                <IoChevronBack size={14} />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all focus-ring ${
                isLast
                  ? 'bg-accent text-accent-foreground hover:opacity-90'
                  : 'glass text-foreground/80 hover:text-foreground'
              }`}
            >
              {isLast ? 'Got it' : 'Next'}
              {!isLast && <IoChevronForward size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

WelcomeTour.displayName = 'WelcomeTour';
export default WelcomeTour;
