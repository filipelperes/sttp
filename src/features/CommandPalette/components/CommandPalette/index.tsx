import CommandPaletteAutoComplete from '@/CommandPalette/components/CommandPaletteAutoComplete';
import CommandPaletteInput from '@/CommandPalette/components/CommandPaletteInput';
import { memo } from 'react';

const CommandPalette = memo(() => {
   return (
      <div id="CommandPalette" className="fixed z-[3] w-[65vw] rounded-[3rem_3rem_0_0] flex flex-col">
         <CommandPaletteInput />
         <CommandPaletteAutoComplete />
      </div>
   );
});

CommandPalette.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "CommandPalette",
};

export default CommandPalette;
