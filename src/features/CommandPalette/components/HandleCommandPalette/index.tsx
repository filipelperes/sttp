import CommandPalette from "@/CommandPalette/components/CommandPalette";
import useCommandPaletteStore from "@/CommandPalette/stores/CommandPaletteStore";
import useSettingsStore from "@/features/Settings/stores/SettingsStore";

const HandleCommandPalette = () => {
  const Show = useCommandPaletteStore(s => s.Show);
  const dim = useSettingsStore(s => s.background.dim);

  return (
    <>
      {/* Background dim overlay when palette is open */}
      {Show && (
        <div
          className="fixed inset-0 z-[2] transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${dim / 100})`,
            backdropFilter: dim > 20 ? `blur(${(dim - 20) / 20}px)` : 'none',
            WebkitBackdropFilter: dim > 20 ? `blur(${(dim - 20) / 20}px)` : 'none',
          }}
        />
      )}
      {Show && <CommandPalette />}
    </>
  );
};

export default HandleCommandPalette;
