import type { IService, IServiceStyle } from "@/types/Service";
import { ServicesList } from "@/CommandPalette/utils/ServicesList";
import type { MouseEvent, KeyboardEvent } from "react";
import useParsedInput from "../../hooks/useParsedInput";

const localhost = ["127.0.0.1", "127::1", "::1", "127...1", "127..1", "..1"];

const setTheme = (style: IServiceStyle | undefined) => {
   document.body.style.setProperty("background-image", style?.backgroundImage ?? "none");
   document.body.style.setProperty("background-color", style?.backgroundColor ?? "#101010");
   document.body.style.setProperty("color", style?.color ?? "#d4d4d4");
};

const clearTheme = () => {
   document.body.style.removeProperty("background-image");
   document.body.style.removeProperty("background-color");
   document.body.style.removeProperty("color");
};

const handleIPSubmit = (isIP: boolean, isStrictURL: boolean, isPartialURL: boolean, value: string) => {
   const match = localhost.find(ip => value.includes(ip));
   window.open(
      isStrictURL || (isIP && value.includes("localhost")) ? value
         : isPartialURL ? value.replace(/^(https?:\/\/)?(www\.)?/i, "https://www.")
            : isIP && localhost.includes(value) ? value.replace(new RegExp(`^((?:[:.])?(${match}))`, 'i'), "127.0.0.1")
               : `https://${value}`,
      "_blank",
      "noopener, noreferrer"
   );
};

const handleServiceSubmit = (value: string) => Object
   .entries(ServicesList)
   .some(([, { name, url }]: [string, IService]) => {
      const pattern = new RegExp(`^${name}([:/]*)`, 'i');
      if (!pattern.test(value)) return false;
      window.open(
         new RegExp(`^${name}([:/]+)`, 'i').test(value) && url.query ?
            `${url.query}${value.replace(pattern, "")}`
            : url.home,
         "_blank",
         "noopener, noreferrer"
      );
      return true;
   });

const handleSubmit = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | KeyboardEvent<HTMLTextAreaElement>, value: string) => {
   const { isEmpty, isIP, isStrictURL, isPartialURL } = useParsedInput(value);
   event.stopPropagation();
   if (isEmpty) return;
   if (isIP || isStrictURL || isPartialURL) {
      handleIPSubmit(isIP, isStrictURL, isPartialURL, value);
      return;
   } //127::1, ::1, 127...1, 127..1 para 127.0.0.1

   if (handleServiceSubmit(value)) return;

   window.open(`https://google.com/search?q=${value}`, "_blank", "noopener, noreferrer");
};

export { localhost, setTheme, clearTheme, handleSubmit };