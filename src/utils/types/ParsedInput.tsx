import type { ServiceGroup } from "../patterns";

export type ParsedInput = {
   value: string;
   code: string;
   isIP: boolean;
   isStrictURL: boolean;
   isPartialURL: boolean;
   dashed: boolean;
   collon: boolean;
   isEmpty: boolean;
   suggestions: {
      matched: boolean;
      suggestions: [string, ServiceGroup][];
   };
   services: {
      matched: boolean;
      service?: [string, ServiceGroup];
      all: [string, ServiceGroup][];
      filtered: [string, ServiceGroup][];
   };
};
