import { parseInput } from '@/utils/parseInput/parseInput';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';
import { useDeferredValue, useMemo } from 'react';

/**
 * Parses the command palette input value with deferred priority.
 *
 * `useDeferredValue` allows the expensive `parseInput()` computation
 * to be interrupted by more urgent state updates (like keystrokes),
 * keeping the textarea responsive during fast typing.
 *
 * The deferred value lags behind the actual value by one render cycle.
 * This means autocomplete suggestions and theme colors may update
 * one frame after the typed character — a negligible visual delay
 * that prevents frame drops on slow devices or large service lists.
 */
const useParsedInput = (value: string): IParsedInput => {
  const deferredValue = useDeferredValue(value);
  return useMemo(() => parseInput(deferredValue), [deferredValue]);
};

export default useParsedInput;
