import { memo, useEffect } from 'react';
import CommandPaletteAutoComplete from '@/CommandPalette/components/CommandPaletteAutoComplete';
import CommandPaletteInput from '@/CommandPalette/components/CommandPaletteInput';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import useParsedInput from '@/CommandPalette/hooks/useParsedInput';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

/**
 * Detects mobile keyboard open/close via the VisualViewport API.
 *
 * - When the keyboard opens (viewport shrinks >30%): sets `--visual-height`
 *   on `<html>` so `#root`/`#App` smoothly shrink to the visible area,
 *   making the page content rise slightly to stay above the keyboard.
 * - When the keyboard closes (viewport returns >85%): removes the CSS
 *   variable so the layout springs back to full viewport height.
 */
function useKeyboardDetection() {
  useEffect(() => {
    const vp = window.visualViewport;
    if (!vp) return;

    let baseline = vp.height;

    const onResize = () => {
      const current = vp.height;
      if (baseline === 0) {
        baseline = current;
        return;
      }

      const ratio = current / baseline;

      if (ratio < 0.7) {
        document.documentElement.style.setProperty('--visual-height', `${current}px`);
      } else if (ratio > 0.85) {
        document.documentElement.style.removeProperty('--visual-height');
        baseline = current;
      }
    };

    vp.addEventListener('resize', onResize);
    return () => {
      vp.removeEventListener('resize', onResize);
      document.documentElement.style.removeProperty('--visual-height');
    };
  }, []);
}

const CommandPalette = memo(() => {
   const Value = useCommandPaletteStore(s => s.Value);
   const { suggestions, services }: IParsedInput = useParsedInput(Value);

   useKeyboardDetection();

   return (
      <div className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none">
         <div
           id="CommandPalette"
           className="relative w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] max-w-[900px] rounded-[2rem_2rem_0_0] sm:rounded-[3rem_3rem_0_0] flex flex-col glass animate-slide-up pointer-events-auto"
           style={{ borderBottom: 'none' }}
         >
            <CommandPaletteInput suggestions={suggestions} services={services} />
            <CommandPaletteAutoComplete suggestions={suggestions} value={Value} />
         </div>
      </div>
   );
});

CommandPalette.displayName = 'CommandPalette';
export default CommandPalette;
