import { memo, type MouseEvent } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import { commandPaletteInputRef } from '@/CommandPalette/utils/commandPaletteRef';

const ClearButton = memo(() => {
  const Value = useCommandPaletteStore(s => s.Value);
  const setValue = useCommandPaletteStore(s => s.setValue);
  const isEmpty = Value.length === 0;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    commandPaletteInputRef.current?.focus();
    if (isEmpty) return;
    setValue('');
  };

  return (
    <button
      className="flex items-center text-inherit cursor-pointer bg-transparent border-none w-auto inset-0 transition-opacity duration-300 ease absolute left-auto right-[calc(2.5rem+5px)] sm:right-[calc(3rem+5px)] text-[1.8rem] sm:text-[2.5rem] hover:opacity-80"
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
