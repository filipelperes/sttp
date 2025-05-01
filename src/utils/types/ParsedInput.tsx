import type { IService } from "../types/Services";

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
      suggestions: [string, IService][];
   };
   services: {
      matched: boolean;
      service?: [string, IService];
      all: [string, IService][];
      filtered: [string, IService][];
   };
};
