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
) => {
  const target = event.currentTarget;

  const submit = () => {
    event.preventDefault();
    handleSubmit(event, value);
  };

  return {
    Enter: submit,
    NumpadEnter: submit,
    Tab: () => {
      event.preventDefault();
      const v = suggestions.suggestions[selectedIdx]?.[1]?.name ?? target.value;
      setCommandPaletteState({ Value: v, SelectedIdx: 0 });
    },
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
