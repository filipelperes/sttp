import { memo, useCallback, type MouseEvent } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';

const ClearButton = memo(() => {
  const CommandPaletteInputRef = useCommandPaletteStore(s => s.CommandPaletteInputRef);
  const Value = useCommandPaletteStore(s => s.Value);
  const setValue = useCommandPaletteStore(s => s.setValue);
  const isEmpty = Value.length === 0;

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    CommandPaletteInputRef.current?.focus();
    if (isEmpty) return;
    if (CommandPaletteInputRef.current) CommandPaletteInputRef.current.value = '';
    setValue('');
  }, [isEmpty, setValue, CommandPaletteInputRef]);

  return (
    <button
      className="flex items-center text-inherit cursor-pointer bg-transparent border-none w-auto inset-0 transition-opacity duration-300 ease absolute left-auto right-[calc(3rem+5px)] text-[2.5rem] hover:opacity-80"
      onClick={handleClick}
      style={{ opacity: isEmpty ? 0 : 1 }}
      aria-label="Clear input"
    >
      <IoMdCloseCircle />
    </button>
  );
});

ClearButton.displayName = 'ClearButton';
export default ClearButton;
