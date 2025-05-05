import { z } from "zod";
import { ServicesList } from "../services";
import type { IParsedInput } from "../types/ParsedInput";
import { isIP } from "net";

export function parse(value): IParsedInput {
   const all = Object.entries(ServicesList);
   const isEmpty = value.length === 0;

   const service = all.find(([, { name }]) => name.toLowerCase().match(value.toLowerCase()));
   const filtered = all.filter(([, { name }]) => name.toLowerCase().includes(value.toLowerCase()));

   return {
      value,
      isIP: z.string()
         .refine( //127::1, ::1, 127...1, 127..1 para 127.0.0.1
            val => ['localhost', '::1'].includes(val) || z.string().ip().safeParse(val).success,
            { message: "Must be a valid IP address or 'localhost'" }
         )
         .safeParse(value).success || isIP(value) !== 0,
      isStrictURL: z.string().url().safeParse(value).success,
      isPartialURL: /^(?!.*\s)[^\s]+\.[a-zA-Z]{2,}/.test(value) || value.startsWith("http") || value.startsWith("www."),
      slash: value.includes("/"),
      collon: value.includes(":"),
      isEmpty,
      all,
      suggestions: {
         matched: (filtered.length > 0),
         suggestions: isEmpty ? all : filtered,
      },
      services: {
         matched: (service !== undefined),
         service,
         filtered,
      }
   } as IParsedInput;
}