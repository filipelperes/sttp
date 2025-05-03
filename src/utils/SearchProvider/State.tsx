import type { IParsedInput } from "../types/ParsedInput";

export const initialParsedInputState: IParsedInput = {
   isIP: false,
   isStrictURL: false,
   isPartialURL: false,
   slash: false,
   collon: false,
   isEmpty: true,
   all: [],
   suggestions: {
      matched: false,
      suggestions: []
   },
   services: {
      matched: false,
      filtered: []
   }
};

export type IInitialSelectedIdx = {
   selectedIdx: number;
};

export const initialSelectedIdx: IInitialSelectedIdx = {
   selectedIdx: 0,
};