import { useCallback, type ChangeEvent, type KeyboardEvent } from 'react';
import HighlightedOverlay from '@/features/CommandPalette/components/HighlightedOverlay';
import ClearButton from '@/features/CommandPalette/components/ClearButton';
import SubmitButton from '@/features/CommandPalette/components/SubmitButton';
import { useBodyColor, useThemeSync, useInputReset } from '@/CommandPalette/hooks/useCommandPaletteTheme';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import useParsedInput from '@/CommandPalette/hooks/useParsedInput';
import getKeyboardActions from '@/utils/keyboard/getKeyboardActions';
import useSyncScroll from '@/CommandPalette/hooks/useSyncScroll';
import { useRef } from 'react';

const CommandPaletteInput = () => {
  const OverlayWrapperRef = useRef<HTMLDivElement | null>(null);

  const CommandPaletteInputRef = useCommandPaletteStore(s => s.CommandPaletteInputRef);
  const Value = useCommandPaletteStore(s => s.Value);
  const SelectedIdx = useCommandPaletteStore(s => s.SelectedIdx);
  const BodyColor = useCommandPaletteStore(s => s.BodyColor);
  const Key = useCommandPaletteStore(s => s.Key);
  const setCommandPaletteState = useCommandPaletteStore(s => s.setCommandPaletteState);
  const setSelectedIdx = useCommandPaletteStore(s => s.setSelectedIdx);
  const setShow = useCommandPaletteStore(s => s.setShow);
  const { suggestions, services } = useParsedInput(Value);

  useBodyColor();
  useThemeSync(suggestions, services, SelectedIdx);
  useInputReset(Key);
  useSyncScroll(CommandPaletteInputRef, OverlayWrapperRef);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    setCommandPaletteState({
      Value: event.currentTarget.value,
      SelectedIdx: Math.max(0, Math.min(suggestions.suggestions.length - 1, SelectedIdx)),
    });
  }, [setCommandPaletteState, suggestions.suggestions.length, SelectedIdx]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    const action = getKeyboardActions(
      event, CommandPaletteInputRef, Value, SelectedIdx,
      setSelectedIdx, setCommandPaletteState, setShow, suggestions,
    );
    action?.[event.code as keyof typeof action]?.();
  }, [CommandPaletteInputRef, Value, SelectedIdx, setSelectedIdx, setCommandPaletteState, setShow, suggestions]);

  const textIndent = services.matched ? '-9rem' : '0';

  return (
    <div className="flex items-center justify-center relative bg-white/0 shadow-[0_4px_30px_#0000001a] backdrop-blur-[20px] border border-scrollbar rounded-[3rem_3rem_0_0] flex-1 border-b-0">
      <div className="relative w-full overflow-hidden mr-[3rem]">
        <HighlightedOverlay
          value={Value}
          services={services}
          ref={OverlayWrapperRef}
          bodyColor={BodyColor}
        />
        <textarea
          ref={CommandPaletteInputRef}
          id="CommandPaletteInput"
          className="z-[2] overflow-x-auto overflow-y-hidden resize-none border-none outline-none bg-transparent text-transparent caret-foreground h-full rounded-tl-[3rem] font-bold text-[3rem] text-center tracking-[1.15px] whitespace-pre break-normal inline-block min-w-full p-[9px]"
          spellCheck={false}
          data-gramm={false}
          data-lt-active={false}
          aria-hidden={false}
          autoCorrect="off"
          wrap="off"
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            textIndent,
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '0 transparent',
            textShadow: '0px 0px 0px rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
      <ClearButton />
      <SubmitButton />
    </div>
  );
};

CommandPaletteInput.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'CommandPaletteInput',
};
export default CommandPaletteInput;
