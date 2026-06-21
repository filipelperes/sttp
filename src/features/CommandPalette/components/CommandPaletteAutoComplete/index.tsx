import { memo, useCallback, useEffect, useRef } from 'react';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import type { IService } from '@/types/Service';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';
import SuggestionListItem from '../SuggestionListItem';

interface ICommandPaletteAutoCompleteProps {
  suggestions: IParsedInput['suggestions'];
}

const CommandPaletteAutoComplete = memo(({ suggestions }: ICommandPaletteAutoCompleteProps) => {
  const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);

  const SelectedIdx = useCommandPaletteStore(s => s.SelectedIdx);
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
      className="max-h-[120px] sm:max-h-[149px] absolute overflow-auto border border-t-0 rounded-b-[2rem] sm:rounded-b-[3rem] w-full top-full z-[3]"
      style={{ borderColor: 'var(--glass-border)' }}
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
});

CommandPaletteAutoComplete.displayName = 'CommandPaletteAutoComplete';
export default CommandPaletteAutoComplete;