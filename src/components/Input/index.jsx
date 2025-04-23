import React, { useRef, useEffect, useState } from 'react';
import { z } from "zod";
import { services as servicesList } from '../../utils/patterns';
import { colors } from '../../utils/colors';
import AutoComplete from '../AutoComplete';
import './style.css';


const Input = ({ focus, setFocus, suggestions, setSuggestions }) => {
   const inputRef = useRef(null);
   const [selectedIndex, setSelectedIndex] = useState(0);

   useEffect(() => {
      if (focus) inputRef.current?.focus();
      else {
         inputRef.current?.blur();
         document.body.style.removeProperty("background-image");
         document.body.style.removeProperty("background-color");
         document.body.style.removeProperty("color");
         setSelectedIndex(0);
         setSuggestions([]);
      }
   }, [focus, setSuggestions]);

   function setServiceTheme({ service }) {
      const color = colors[service?.[0]];
      document.body.style.backgroundImage = color?.backgroundImage ?? "none";
      document.body.style.backgroundColor = color?.backgroundColor ?? "#101010";
      document.body.style.color = color?.color ?? "#d4d4d4";
   }

   function onSubmit(input) {
      const isIP = z.string().ip().safeParse(input).success;
      const isStrictURL = z.string().url().safeParse(input).success;
      const isPartialURL = /^(?!.*\s)[^\s]+\.[a-zA-Z]{2,}/.test(input) || input.startsWith("http") || input.startsWith("www.");

      if (isIP || isStrictURL || isPartialURL || input.startsWith("localhost")) {
         window.open(
            isStrictURL ? input : isPartialURL ? input.replace(/^(https?:\/\/)?(www\.)?/i, "https://www.") : `http${isIP && !["127.0.0.1", "127::1"].includes(input) ? "s" : ""}://${input}`,
            "_blank",
            false
         );
         return;
      }

      const matchService = Object.entries(servicesList).some(([, service]) => {
         const all = service?.pattern && service?.action ? [service] : Object.values(service);
         return all.some((s) => {
            if (!s?.pattern?.test(input)) return false;
            s.action?.(input.match(s.pattern)?.[0]);
            return true;
         });
      });
      if (matchService) return;

      window.open(`https://google.com/search?q=${input}`, "_blank", false);
   }

   function parse(value, code) {
      const all = Object.entries(servicesList);
      const isEmpty = value.length === 0;

      const service = all.find(([, val]) => {
         const entries = val?.pattern && val?.action ? [val] : Object.values(val);
         return entries.some((s) => s?.pattern instanceof RegExp && s.pattern.test(value));
      });

      const suggestions = all.filter(([name]) =>
         (isEmpty && ["ArrowRight", "Tab"].includes(code)) || name.match(value)
      );

      return {
         value,
         isIP: z.string()
            .refine( //127::1, ::1, 127...1, 127..1 para 127.0.0.1
               val => ['localhost', '::1'].includes(val) || z.string().ip().safeParse(val).success,
               { message: "Must be a valid IP address or 'localhost'" }
            )
            .safeParse(value).success,
         isStrictURL: z.string().url().safeParse(value).success,
         isPartialURL: /^(?!.*\s)[^\s]+\.[a-zA-Z]{2,}/.test(value) || value.startsWith("http") || value.startsWith("www."),
         dashed: value.includes("/"),
         collon: value.includes(":"),
         isEmpty,
         suggestions: {
            matched: (suggestions.length > 0),
            suggestions,
         },
         services: {
            matched: (service !== undefined),
            service,
            all,
            filtered: all.filter(([, val]) => {
               const entries = val?.pattern && val?.action ? [val] : Object.values(val);
               return entries.some((s) => s?.pattern instanceof RegExp && s.pattern.test(value));
            }), // MISTERIOSO CASO DE FILTERED O UNICO DE FUNÇÃO QUE NÃO FUNCIONA PQ?
         }
      };
   }

   const onChange = (event) => {
      event.stopPropagation();
      const { services } = parse(event.target.value, event.code);
      console.log(parse(event.target.value, event.code));
      setServiceTheme(services);
      setSuggestions(Object.entries(servicesList).filter(([name]) =>
         (event.target.value.length === 0 && ["ArrowRight", "Tab"].includes(event.code)) || name.match(event.target.value)
      ));
   };

   const onKeyDown = (event) => {
      event.stopPropagation();
      const submit = () => {
         event.preventDefault();
         onSubmit(event.target.value);
      };

      const complete = () => {
         event.preventDefault();
         if (event.target.value.length === 0) return;
         event.target.value = suggestions[selectedIndex]?.[0] ?? event.target.value;
         setSelectedIndex(0);
         setSuggestions([]);
      };

      const keyActions = {
         Enter: submit,
         NumpadEnter: submit,
         Tab: complete,
         ArrowRight: complete,
         Escape: () => {
            event.target.value = "";
            setFocus(false);
            setSelectedIndex(0);
            setSuggestions([]);
         },
         ArrowDown: () => {
            event.preventDefault();
            setSelectedIndex((prev) => prev === suggestions.length - 1 ? 0 : prev + 1);
         },
         ArrowUp: () => {
            event.preventDefault();
            setSelectedIndex((prev) => prev === 0 ? suggestions.length - 1 : prev - 1);
         },
         Home: () => {
            event.preventDefault();
            setSelectedIndex(0);
         },
         End: () => {
            event.preventDefault();
            setSelectedIndex(suggestions.length - 1);
         },
      };

      keyActions[event.code]?.();
   };

   return (
      <>
         {focus && (
            <>
               <textarea
                  id="Input"
                  ref={inputRef}
                  spellCheck="false"
                  wrap="off"
                  rows={1}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
               />
               <AutoComplete
                  suggestions={suggestions}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
               />
            </>
         )}
      </>
   );

};

export default Input;
