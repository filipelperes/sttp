import { memo, useCallback, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import SettingsPanel from '@/features/Settings/components/SettingsPanel';

const SettingsButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button
        onClick={toggle}
        aria-label="Open settings"
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full glass text-foreground/60 hover:text-foreground cursor-pointer transition-all duration-200 hover:scale-110 focus-ring"
      >
        <IoSettingsOutline size={22} />
      </button>
      {isOpen && <SettingsPanel onClose={close} />}
    </>
  );
});

SettingsButton.displayName = 'SettingsButton';
export default SettingsButton;
