import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ILocaleOption {
  value: string;
  label: string;
  example: string;
}

interface ILanguagePickerProps {
  options: ILocaleOption[];
  value: string;
  onChange: (value: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const LanguagePicker = memo(({ options, value, onChange }: ILanguagePickerProps) => {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(() => options.findIndex((o) => o.value === value));
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  /* Close on click outside */
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  /* Scroll focused item into view */
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[focusIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusIdx, open]);

  const handleTrigger = useCallback(() => {
    setOpen((prev) => {
      if (!prev) setFocusIdx(options.findIndex((o) => o.value === value));
      return !prev;
    });
  }, [options, value]);

  const handleSelect = useCallback(
    (v: string) => {
      onChange(v);
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusIdx((i) => Math.min(i + 1, options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusIdx((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onChange(options[focusIdx].value);
          setOpen(false);
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'Tab':
          setOpen(false);
          break;
      }
    },
    [open, options, focusIdx, onChange],
  );

  return (
    <div ref={containerRef} className="relative w-full min-w-0" onKeyDown={handleKeyDown}>
      {/* ---- Trigger button ---- */}
      <button
        type="button"
        onClick={handleTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg glass text-foreground text-sm outline-none cursor-pointer focus-ring transition-colors hover:bg-surface-hover"
      >
        <span className="truncate">{selected?.label ?? value}</span>
        <IoChevronDown
          size={14}
          className={`shrink-0 text-foreground/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* ---- Dropdown ---- */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-activedescendant={`locale-option-${focusIdx}`}
          className="absolute z-50 left-0 right-0 mt-1.5 max-h-[280px] overflow-auto rounded-xl glass-strong animate-scale-in shadow-xl"
          style={{ '--surface-elevated': 'color-mix(in srgb, var(--color-background) 92%, transparent)' } as React.CSSProperties}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isFocused = i === focusIdx;
            return (
              <li
                key={opt.value}
                id={`locale-option-${i}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setFocusIdx(i)}
                className={`
                  flex flex-col items-center justify-center px-3 py-2.5 cursor-pointer
                  text-sm text-center transition-colors
                  ${isFocused ? 'bg-accent/10' : ''}
                  ${isSelected ? 'text-accent font-semibold' : 'text-foreground/70'}
                  ${i > 0 ? 'border-t border-border/40' : ''}
                  hover:bg-accent/10
                `}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="text-[10px] text-accent/60 font-normal mt-0.5">
                    {opt.example}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

LanguagePicker.displayName = 'LanguagePicker';
export default LanguagePicker;
