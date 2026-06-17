import Icon from '@/components/Icon';
import TextHighlight from '@/components/TextHighlight';
import type { IServiceIcon, IServiceStyle } from '@/types/Service';
import { memo, useCallback, type MouseEvent } from 'react';
import { setTheme } from '@/CommandPalette/utils/CommandPalette';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import { parseInput } from '@/utils/parseInput/parseInput';

interface ISuggestionListItemProps {
  index: number;
  isSelected: boolean;
  name: string;
  icon: IServiceIcon;
  style?: IServiceStyle;
  setRef: (el: HTMLLIElement | null, i: number) => void;
}

const SuggestionListItem = memo(({
  index,
  isSelected,
  name,
  icon,
  style,
  setRef,
}: ISuggestionListItemProps) => {
  const setCommandPaletteState = useCommandPaletteStore(s => s.setCommandPaletteState);
  const CommandPaletteInputRef = useCommandPaletteStore(s => s.CommandPaletteInputRef);
  const Value = useCommandPaletteStore(s => s.Value);

  const handleClick = useCallback((event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.name ?? '';
    setCommandPaletteState({ Value: value, SelectedIdx: 0 });
    if (CommandPaletteInputRef.current) {
      CommandPaletteInputRef.current.value = value;
      CommandPaletteInputRef.current.focus();
    }
  }, [setCommandPaletteState, CommandPaletteInputRef]);

  const handleMouseEnter = useCallback(() => setTheme(style), [style]);

  const handleMouseLeave = useCallback(() => {
    const { Value: currentValue, SelectedIdx: currentIdx } = useCommandPaletteStore.getState();
    const parsed = parseInput(currentValue);
    const themeStyle = parsed.suggestions.suggestions[currentIdx]?.[1]?.style
      ?? parsed.services.service?.[1]?.style;
    setTheme(themeStyle as IServiceStyle | undefined);
  }, []);

  return (
    <li
      ref={el => setRef(el, index)}
      data-name={name}
      id={`suggestion-${index}`}
      className={`${isSelected ? 'bg-scrollbar ' : ''}flex items-center justify-center cursor-pointer text-[1.3rem] tracking-[1.15px] px-[3px] py-[11px] hover:bg-scrollbar`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon icon={icon} fill={style?.backgroundColor} style={style} />
      <TextHighlight name={name} value={Value} />
    </li>
  );
});

SuggestionListItem.displayName = 'SuggestionListItem';
export default SuggestionListItem;
