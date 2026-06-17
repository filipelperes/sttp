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
      className="max-h-[149px] absolute overflow-auto border border-t-0 rounded-b-[3rem] w-full top-full z-[3]"
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
};

export default CommandPaletteAutoComplete;
