import type { KeyboardEvent } from 'react';
import { handleSubmit } from '@/utils/url/urlUtils';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

const getKeyboardActions = (
  event: KeyboardEvent<HTMLTextAreaElement>,
  inputRef: React.RefObject<HTMLTextAreaElement | null>,
  value: string,
  selectedIdx: number,
  setSelectedIdx: (idx: number) => void,
  setCommandPaletteState: (state: { Value?: string; SelectedIdx?: number }) => void,
  setShow: (show: boolean) => void,
  suggestions: IParsedInput['suggestions'],
  services: IParsedInput['services'],
) => {
  const target = event.currentTarget;

  const hasSuggestions = suggestions.suggestions.length > 0;
  const hasServiceMatch = services.matched;

  const submit = () => {
    event.preventDefault();
    handleSubmit(event, value);
  };

  /** Fills the currently highlighted suggestion into the input (like Tab) */
  const fillSuggestion = () => {
    event.preventDefault();
    const v = suggestions.suggestions[selectedIdx]?.[1]?.name ?? target.value;
    setCommandPaletteState({ Value: v, SelectedIdx: 0 });
  };

  return {
    Enter: () => {
      // If there's a service match → navigate to it (submit)
      // If no service match but there are autocomplete suggestions → fill suggestion
      // If no service match and no suggestions → submit (URL/IP/search)
      if (hasServiceMatch) {
        submit();
      } else if (hasSuggestions) {
        fillSuggestion();
      } else {
        submit();
      }
    },
    NumpadEnter: () => {
      if (hasServiceMatch) {
        submit();
      } else if (hasSuggestions) {
        fillSuggestion();
      } else {
        submit();
      }
    },
    Tab: fillSuggestion,
    Escape: () => {
      setShow(false);
    },
    ArrowDown: () => {
      event.preventDefault();
      setSelectedIdx(selectedIdx === suggestions.suggestions.length - 1 ? 0 : selectedIdx + 1);
    },
    ArrowUp: () => {
      event.preventDefault();
      setSelectedIdx(selectedIdx === 0 ? suggestions.suggestions.length - 1 : selectedIdx - 1);
    },
    Home: () => {
      event.preventDefault();
      if (suggestions.matched) setSelectedIdx(0);
      else {
        inputRef.current?.setSelectionRange(0, 0);
        inputRef.current?.scroll({ behavior: 'smooth', left: 0 });
      }
    },
    End: () => {
      event.preventDefault();
      if (suggestions.matched) setSelectedIdx(suggestions.suggestions.length - 1);
      else {
        const len = target.value.length;
        inputRef.current?.setSelectionRange(len, len);
        inputRef.current?.scroll({ behavior: 'smooth', left: 999999 });
      }
    },
  };
};

export default getKeyboardActions;
