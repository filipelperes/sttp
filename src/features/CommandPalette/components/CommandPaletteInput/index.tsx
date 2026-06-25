import { memo, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { useShallow } from 'zustand/react/shallow';
import HighlightedOverlay from '@/features/CommandPalette/components/HighlightedOverlay';
import ClearButton from '@/features/CommandPalette/components/ClearButton';
import SubmitButton from '@/features/CommandPalette/components/SubmitButton';
import { useBodyColor, useThemeSync, useInputReset } from '@/CommandPalette/hooks/useCommandPaletteTheme';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import { commandPaletteInputRef } from '@/CommandPalette/utils/commandPaletteRef';
import getKeyboardActions from '@/utils/keyboard/getKeyboardActions';
import useSyncScroll from '@/CommandPalette/hooks/useSyncScroll';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

interface ICommandPaletteInputProps {
  suggestions: IParsedInput['suggestions'];
  services: IParsedInput['services'];
}

const CommandPaletteInput = memo(({ suggestions, services }: ICommandPaletteInputProps) => {
  const OverlayWrapperRef = useRef<HTMLDivElement | null>(null);

  // Grouped selectors — single subscription instead of 7 individual ones
  const { Value, SelectedIdx, BodyColor, Key } = useCommandPaletteStore(
    useShallow((s) => ({
      Value: s.Value,
      SelectedIdx: s.SelectedIdx,
      BodyColor: s.BodyColor,
      Key: s.Key,
    })),
  );
  // Actions are stable references — grouped together
  const { setCommandPaletteState, setSelectedIdx, setShow } = useCommandPaletteStore(
    useShallow((s) => ({
      setCommandPaletteState: s.setCommandPaletteState,
      setSelectedIdx: s.setSelectedIdx,
      setShow: s.setShow,
    })),
  );

  useBodyColor();
  useThemeSync(suggestions, services, SelectedIdx);
  useInputReset(Key);
  useSyncScroll(commandPaletteInputRef, OverlayWrapperRef);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { SelectedIdx: currentIdx } = useCommandPaletteStore.getState();
    const currentSuggestions = suggestions.suggestions;
    event.stopPropagation();
    setCommandPaletteState({
      Value: event.currentTarget.value,
      SelectedIdx: Math.max(0, Math.min(currentSuggestions.length - 1, currentIdx)),
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    const action = getKeyboardActions(
      event, commandPaletteInputRef, Value, SelectedIdx,
      setSelectedIdx, setCommandPaletteState, setShow, suggestions, services,
    );
    action?.[event.code as keyof typeof action]?.();
  };

  const textIndent = services.matched ? '-7rem' : '0';

  return (
    <div className="flex items-center justify-center relative rounded-[2rem_2rem_0_0] sm:rounded-[3rem_3rem_0_0] flex-1 border-b-0">
      <div className="relative w-full overflow-hidden mr-[2.5rem] sm:mr-[3rem]">
        <HighlightedOverlay
          value={Value}
          services={services}
          ref={OverlayWrapperRef}
          bodyColor={BodyColor}
        />
        <textarea
          ref={commandPaletteInputRef}
          value={Value}
          id="CommandPaletteInput"
          className="z-[2] overflow-x-auto overflow-y-hidden resize-none border-none outline-none bg-transparent text-transparent h-full rounded-tl-[2rem] sm:rounded-tl-[3rem] font-bold text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] text-center tracking-[1.15px] whitespace-pre break-normal inline-block min-w-full p-[6px] sm:p-[9px]"
          style={{
            textIndent,
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '0 transparent',
            textShadow: '0px 0px 0px rgba(0, 0, 0, 0.5)',
            caretColor: 'var(--caret-color, auto)',
          }}
          spellCheck={false}
          data-gramm={false}
          data-lt-active={false}
          aria-hidden={false}
          autoCorrect="off"
          wrap="off"
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ClearButton />
      <SubmitButton />
    </div>
  );
});

export default CommandPaletteInput;