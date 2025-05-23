import CommandPaletteAutoComplete from '../CommandPaletteAutoComplete';
import './style.css';
import CommandPaletteInput from '../CommandPaletteInput';
import { memo } from 'react';

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
