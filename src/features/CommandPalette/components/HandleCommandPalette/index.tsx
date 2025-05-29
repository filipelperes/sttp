import CommandPalette from "@/CommandPalette/components/CommandPalette";
import useCommandPaletteStore from "@/CommandPalette/stores/CommandPaletteStore";

const HandleCommandPalette = () => {
   const Show = useCommandPaletteStore(s => s.Show);

   return (
      <>
         {Show && <CommandPalette />}
      </>
   );
};

HandleCommandPalette.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "HandleCommandPalette",
};

export default HandleCommandPalette;