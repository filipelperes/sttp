import useAppStore from "../../../stores/AppStore";
import CommandPalette from "../CommandPalette";

const HandleCommandPalette = () => (
   <>
      {useAppStore(s => s.OpenCommandPalette) && <CommandPalette />}
   </>
);

HandleCommandPalette.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "HandleCommandPalette",
};
export default HandleCommandPalette;