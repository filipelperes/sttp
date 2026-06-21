import { memo, type MouseEvent } from 'react';
import { RxChevronRight } from 'react-icons/rx';
import { handleSubmit } from '@/utils/url/urlUtils';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';

const SubmitButton = memo(() => {
  const Value = useCommandPaletteStore(s => s.Value);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    handleSubmit(event, Value);
  };

  return (
    <button
      className="flex items-center text-inherit cursor-pointer bg-transparent border-none w-auto relative inset-0 text-[2rem] sm:text-[3rem] -left-[6px] sm:-left-[9px]"
      onClick={handleClick}
      aria-label="Submit"
    >
      <RxChevronRight />
    </button>
  );
});

SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;
