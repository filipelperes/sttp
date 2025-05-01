import type { IServiceGroup } from "../patterns";

export type IParsedInput = {
   value: string;
   isIP: boolean;
   isStrictURL: boolean;
   isPartialURL: boolean;
   dashed: boolean;
   collon: boolean;
   isEmpty: boolean;
   suggestions: {
      matched: boolean;
      suggestions: [string, IServiceGroup][];
   };
   services: {
      matched: boolean;
      service?: [string, IServiceGroup];
      all: [string, IServiceGroup][];
      filtered: [string, IServiceGroup][];
   };
};
