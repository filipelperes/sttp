import { memo, Suspense, lazy, useCallback, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

const SettingsPanel = lazy(() => import('@/features/Settings/components/SettingsPanel'));

const SettingsButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const accentOnIcons = useSettingsStore((s) => s.accentOnIcons);

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