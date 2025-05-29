import Icon from "@/components/Icon";
import TextHighlight from "@/components/TextHighlight";
import type { IServiceIcon, IServiceStyle } from "@/types/Service";
import { type ICommandPaletteStore } from "@/CommandPalette/stores/CommandPaletteStore";
import { memo, useCallback, type MouseEvent, type RefObject } from "react";
import useParsedInput from "@/CommandPalette/hooks/useParsedInput";
import { setTheme } from "@/CommandPalette/utils/CommandPalette";

type ISuggestionsListItem = {
   i: number;
   isSelected: boolean;
   name: string;
   icon: IServiceIcon;
   style?: IServiceStyle;
   setRef: (el: HTMLLIElement | null, i: number) => void;
   CommandPaletteInputRef: RefObject<HTMLTextAreaElement | null>;
   setCommandPaletteState: (state: Partial<ICommandPaletteStore>) => void;
   SelectedIdx: number;
   value: string;
};

const SuggestionsListItem = memo(({
   i,
   isSelected,
   name,
   icon,
   style,
   setRef,
   CommandPaletteInputRef,
   setCommandPaletteState,
   SelectedIdx,
   value
}: ISuggestionsListItem) => {
   const { suggestions, services } = useParsedInput(value);

   const handleClick = (event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
      const value = event.currentTarget.dataset.name ?? '';
      setCommandPaletteState({
         Value: value,
         SelectedIdx: 0,
      });
      if (CommandPaletteInputRef.current) {
         CommandPaletteInputRef.current.value = value;
         CommandPaletteInputRef.current.focus();
      }
   };

   const handleMouseEnter = useCallback((style: IServiceStyle | undefined) => () => setTheme(style), []);

   const handleMouseLeave = useCallback(() => setTheme(suggestions.suggestions[SelectedIdx]?.[1]?.style || services.service?.[1]?.style), [SelectedIdx, suggestions, services]);

   return (
      <li
         ref={el => setRef(el, i)}
         data-name={name}
         key={name}
         id={`suggestion-${i}`}
         className={`${isSelected ? "selected " : ""}d-flex justify-center align-middle`}
         onClick={handleClick}
         onMouseEnter={handleMouseEnter(style)}
         onMouseLeave={handleMouseLeave}
      >
         <Icon icon={icon} fill={style?.backgroundColor} style={style} />
         <TextHighlight name={name} value={value} />
      </li>
   );
});

export default SuggestionsListItem;
