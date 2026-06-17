import { parseInput } from '@/utils/parseInput/parseInput';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';
import { useMemo } from 'react';

const useParsedInput = (value: string): IParsedInput =>
  useMemo(() => parseInput(value), [value]);

export default useParsedInput;
