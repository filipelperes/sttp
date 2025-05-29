import { ServicesList } from "@/utils/ServicesList";
import z from "zod";
import { localhost } from "@/CommandPalette/utils/CommandPalette";
import type { IParsedInput } from "@/CommandPalette/types/ParsedInput";
import { useMemo } from "react";

const useParsedInput = (value: string): IParsedInput =>
   useMemo(() => {
      const all = Object.entries(ServicesList);
      const isEmpty = value.length === 0;
      const service = all.find(([, { name }]) => value.toLowerCase().match(name.toLowerCase()));
      const filtered = all.filter(([, { name }]) => name.toLowerCase().includes(value.toLowerCase()));

      return {
         isIP: z.string()
            .refine(
               val => localhost.includes(val) || val.includes("localhost") || z.string().ip().safeParse(val).success,
               { message: "Must be a valid IP address or 'localhost'" }
            )
            .safeParse(value).success,
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
      };
   }, [value]);

export default useParsedInput;