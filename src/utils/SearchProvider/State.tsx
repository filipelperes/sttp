import type { IParsedInput } from "../types/ParsedInput";

export const initialParsedInputState: IParsedInput = {
   value: "",
   isIP: false,
   isStrictURL: false,
   isPartialURL: false,
   dashed: false,
   collon: false,
   isEmpty: true,
   suggestions: {
      matched: false,
      suggestions: []
   },
   services: {
      matched: false,
      all: [],
      filtered: []
   }
};

export type IInitialSelectedIdx = {
   selectedIdx: number;
};

export const initialSelectedIdx: IInitialSelectedIdx = {
   selectedIdx: 0,
};