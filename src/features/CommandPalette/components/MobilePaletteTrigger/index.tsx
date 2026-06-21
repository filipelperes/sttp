import { memo, useCallback } from 'react';
import { IoSearch } from 'react-icons/io5';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';

const MobilePaletteTrigger = memo(() => {
  const Show = useCommandPaletteStore((s) => s.Show);
  const setShow = useCommandPaletteStore((s) => s.setShow);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, [setShow]);

  // Only show on mobile/small screens when palette is closed
  if (Show) return null;

  return (
    <button
      onClick={handleOpen}
      aria-label="Open command palette"
      className="fixed bottom-20 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 focus-ring
        sm:bottom-24 sm:right-6
        md:hidden"
    >
      <IoSearch size={24} />
    </button>
  );
});

MobilePaletteTrigger.displayName = 'MobilePaletteTrigger';
export default MobilePaletteTrigger;
