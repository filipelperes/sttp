import Icon from '@/components/Icon';
import TextHighlight from '@/components/TextHighlight';
import type { IServiceIcon, IServiceStyle } from '@/types/Service';
import { memo, useCallback, type MouseEvent } from 'react';
import { setTheme } from '@/CommandPalette/utils/CommandPalette';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import { parseInput } from '@/utils/parseInput/parseInput';

/** Converts a hex color to rgba with the given opacity */
const hexToRgba = (hex: string, alpha: number): string => {
  const clean = hex.replace('#', '');
  if (clean.length !== 6 && clean.length !== 3) return `rgba(128, 128, 128, ${alpha})`;
  const fullHex = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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
    CommandPaletteInputRef.current?.focus();
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
      style={{
        ...(isSelected && style?.backgroundColor ? {
          backgroundColor: hexToRgba(style.backgroundColor, 0.15),
          borderLeftColor: style.backgroundColor,
        } : {}),
        ...(isSelected ? { color: style?.color || style?.backgroundColor || 'var(--color-accent)' } : {}),
      }}
      className={`border-l-2 ${isSelected ? 'font-semibold' : 'border-transparent'} flex items-center justify-center cursor-pointer text-[1rem] sm:text-[1.3rem] tracking-[1.15px] px-[3px] py-[8px] sm:py-[11px] hover:bg-accent/10 transition-colors`}
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
