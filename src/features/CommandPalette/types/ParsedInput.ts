import type { IService } from "@/types/Service";

export type IParsedInput = {
   isIP: boolean;
   isStrictURL: boolean;
   isPartialURL: boolean;
   slash: boolean;
   collon: boolean;
   isEmpty: boolean;
   all: [string, IService][];
   suggestions: {
      matched: boolean;
      suggestions: [string, IService][];
   };
   services: {
      matched: boolean;
      service?: [string, IService];
      filtered: [string, IService][];
   };
};
