import { z } from "zod";
import { ServicesList } from "../../utils/services";
import type { IParsedInput } from "../../utils/types/ParsedInput";

export const localhost = ["127.0.0.1", "127::1", "::1", "127...1", "127..1", "..1"];

export const setTheme = (style) => {
   document.body.style.setProperty("background-image", style?.backgroundImage ?? "none");
   document.body.style.setProperty("background-color", style?.backgroundColor ?? "#101010");
   document.body.style.setProperty("color", style?.color ?? "#d4d4d4");
};

export const resetStyle = () => {
   document.body.style.removeProperty("background-image");
   document.body.style.removeProperty("background-color");
   document.body.style.removeProperty("color");
};

export function parse(value): IParsedInput {
   const all = Object.entries(ServicesList);
   const isEmpty = value.length === 0;

   const service = all.find(([, { name }]) => name.toLowerCase().match(value.toLowerCase()));
   const filtered = all.filter(([, { name }]) => name.toLowerCase().includes(value.toLowerCase()));

   return {
      value,
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
   } as IParsedInput;
}