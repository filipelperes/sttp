import { memo, Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { useAccentSettingsStore } from '@/features/Settings/stores/settings';

const importSettingsPanel = () => import('@/features/Settings/components/SettingsPanel');
const SettingsPanel = lazy(importSettingsPanel);

const SettingsButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const accentOnIcons = useAccentSettingsStore((s) => s.accentOnIcons);

  // Preload SettingsPanel bundle in background as soon as page mounts,
  // so clicking the button is instant — no lazy-load delay.
  useEffect(() => {
    importSettingsPanel().catch(() => {
      /* Preload failed (e.g. missing assets) — SettingsPanel will lazy-load on click */
    });
  }, []);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  const iconColor = accentOnIcons ? 'text-accent/70 hover:text-accent' : 'text-foreground/60 hover:text-foreground';

  return (
    <>
      <button
        onClick={toggle}
        aria-label="Open settings"
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full glass cursor-pointer transition-all duration-200 hover:scale-110 focus-ring ${iconColor}`}
      >
        <IoSettingsOutline size={22} />
      </button>
      {isOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black/20 animate-fade-in" />}>
          <SettingsPanel onClose={close} />
        </Suspense>
      )}
    </>
  );
});

SettingsButton.displayName = 'SettingsButton';
export default SettingsButton;