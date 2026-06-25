import { memo } from 'react';
import CommandPalette from "@/CommandPalette/components/CommandPalette";
import useCommandPaletteStore from "@/CommandPalette/stores/CommandPaletteStore";
import { useAppearanceStore } from "@/features/Settings/stores/settings";

const HandleCommandPalette = memo(() => {
  const Show = useCommandPaletteStore(s => s.Show);
  const dim = useAppearanceStore(s => s.background.dim);

  return (
    <>
      {/* Background dim overlay when palette is open */}
      {Show && (
        <div
          className="fixed inset-0 z-[2] transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${dim / 100})`,
            backdropFilter: dim >= 40 ? `blur(${(dim - 40) / 15}px)` : 'none',
            WebkitBackdropFilter: dim >= 40 ? `blur(${(dim - 40) / 15}px)` : 'none',
          }}
        />
      )}
      {Show && <CommandPalette />}
    </>
  );
});

HandleCommandPalette.displayName = 'HandleCommandPalette';
export default HandleCommandPalette;