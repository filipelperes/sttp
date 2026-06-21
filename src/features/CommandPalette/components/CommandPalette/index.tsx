import { memo } from 'react';
import CommandPaletteAutoComplete from '@/CommandPalette/components/CommandPaletteAutoComplete';
import CommandPaletteInput from '@/CommandPalette/components/CommandPaletteInput';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import useParsedInput from '@/CommandPalette/hooks/useParsedInput';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

const CommandPalette = memo(() => {
   const Value = useCommandPaletteStore(s => s.Value);
   const { suggestions, services }: IParsedInput = useParsedInput(Value);

   return (
      <div
        id="CommandPalette"
        className="fixed z-[3] w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] max-w-[900px] rounded-[2rem_2rem_0_0] sm:rounded-[3rem_3rem_0_0] flex flex-col glass animate-slide-up"
        style={{ borderBottom: 'none' }}
      >
         <CommandPaletteInput suggestions={suggestions} services={services} />
         <CommandPaletteAutoComplete suggestions={suggestions} />
      </div>
   );
});

CommandPalette.displayName = 'CommandPalette';
export default CommandPalette;