import { useCallback, useEffect, useRef } from 'react';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import type { IService } from '@/types/Service';
import useParsedInput from '@/CommandPalette/hooks/useParsedInput';
import SuggestionListItem from '../SuggestionListItem';

const CommandPaletteAutoComplete = () => {
  const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);

  const SelectedIdx = useCommandPaletteStore(s => s.SelectedIdx);
  const Value = useCommandPaletteStore(s => s.Value);
  const { suggestions } = useParsedInput(Value);
  const items = suggestions.suggestions;

  useEffect(() => {
    suggestionsRef.current[SelectedIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [SelectedIdx]);

  const setRef = useCallback(
    (el: HTMLLIElement | null, i: number) => { suggestionsRef.current[i] = el; },
    [],
  );

  if (items.length === 0) return null;

  return (
    <ul
      id="CommandPaletteAutoComplete"
      className="max-h-[149px] absolute overflow-auto border border-scrollbar border-t-0 rounded-b-[3rem] w-full top-full z-[3] bg-white/0 shadow-[0_4px_30px_#0000001a] backdrop-blur-[20px]"
    >
      {items.map(([key, { name, icon, style }]: [string, IService], i: number) => (
        <SuggestionListItem
          key={key}
          index={i}
          isSelected={i === SelectedIdx}
          name={name}
          icon={icon}
          style={style}
          setRef={setRef}
        />
      ))}
    </ul>
  );
};

CommandPaletteAutoComplete.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'CommandPaletteAutoComplete',
};
export default CommandPaletteAutoComplete;
