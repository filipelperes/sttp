import { useRef } from 'react';
import CommandPaletteAutoComplete from '../CommandPaletteAutoComplete';
import './style.css';
import CommandPaletteInput from '../CommandPaletteInput';
import { CommandPaletteProvider } from '../../providers/CommandPaletteProvider';

const CommandPalette = () => {
   const CommandPaletteInputRef = useRef<HTMLTextAreaElement | null>(null);

   return (
      <>
         <div id="CommandPalette" className="d-flex column">
            <CommandPaletteProvider>
               <CommandPaletteInput CommandPaletteInputRef={CommandPaletteInputRef} />
               <CommandPaletteAutoComplete CommandPaletteInputRef={CommandPaletteInputRef} />
            </CommandPaletteProvider>
         </div>
      </>

   );

};

export default CommandPalette;
