import CommandPaletteAutoComplete from '@/CommandPalette/components/CommandPaletteAutoComplete';
import CommandPaletteInput from '@/CommandPalette/components/CommandPaletteInput';
import { memo } from 'react';
import './style.css';

const CommandPalette = memo(() => {
   return (
      <div id="CommandPalette" className="d-flex column">
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
