import { z } from "zod";
import { ServicesList } from '../../utils/services';
import type { IParsedInput } from '../../utils/types/ParsedInput';
import { useCallback, useContext, useEffect, useRef } from "react";
import { SearchContext } from "../../utils/SearchProvider/Context";
import { StoreContext } from "../../StoreProvider/Context";
import { SearchInputActions } from "../../StoreProvider/Actions";
import { ParsedInputActions, SelectedIdxActions } from "../../utils/SearchProvider/Actions";
import "./style.css";
import type { IService } from "../../utils/types/Services";

const SearchInput = () => {
   const searchInputRef = useRef<(HTMLTextAreaElement | null)>(null);
   const { searchState, setSearchState } = useContext(SearchContext);
   const { storeState, setStoreState } = useContext(StoreContext);
   const { parsedInput, selectedIdx } = searchState;
   const { isEmpty, isIP, isPartialURL, isStrictURL, suggestions, value } = parsedInput;

   const setServiceTheme = useCallback(() => {
      const style = suggestions.suggestions[selectedIdx]?.[1]?.style;
      document.body.style.backgroundImage = style?.backgroundImage ?? "none";
      document.body.style.backgroundColor = style?.backgroundColor ?? "#101010";
      document.body.style.color = style?.color ?? "#d4d4d4";
   }, [suggestions, selectedIdx]);

   useEffect(() => setServiceTheme(), [suggestions, setServiceTheme]);
   useEffect(() => {
      if (storeState.focusSearchInput) searchInputRef.current?.focus();
      else {
         searchInputRef.current?.blur();
         setSearchState({ type: ParsedInputActions.RESET_PARSED });
         setSearchState({ type: SelectedIdxActions.RESET });
      }
      return () => {
         document.body.style.removeProperty("background-image");
         document.body.style.removeProperty("background-color");
         document.body.style.removeProperty("color");
      };
   }, [storeState.focusSearchInput, setSearchState]);

   function onSubmit(input) {
      if (isIP || isStrictURL || isPartialURL || input.startsWith("localhost")) {
         window.open(
            isStrictURL ? input : isPartialURL ? input.replace(/^(https?:\/\/)?(www\.)?/i, "https://www.") : `http${isIP && !["127.0.0.1", "127::1"].includes(input) ? "s" : ""}://${input}`,
            "_blank",
            "noopener, noreferrer"
         );
         return;
      }

      const matchService = Object.entries(ServicesList).some(([, service]: [string, IService]) => {
         if (!service?.pattern?.test(input)) return false;
         service?.action?.(input.match(service.pattern)?.[0]);
         return true;
      });
      if (matchService) return;

      window.open(`https://google.com/search?q=${input}`, "_blank", "noopener, noreferrer");
   }

   function parse(value, code) {
      const all = Object.entries(ServicesList);
      const isEmpty = value.length === 0;

      const service = all.find(([, service]: [string, IService]) => service.pattern.test(value));
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
            filtered: all.filter(([, service]: [string, IService]) => service?.pattern?.test(value)), // MISTERIOSO CASO DE FILTERED O UNICO DE FUNÇÃO QUE NÃO FUNCIONA PQ?
         }
      } as IParsedInput;
   }

   const onChange = (event) => {
      event.stopPropagation();
      setSearchState({ type: ParsedInputActions.SET_PARSED, payload: parse(event.target.value, event.code) });
   };

   const onKeyDown = (event) => {
      event.stopPropagation();
      const submit = () => {
         event.preventDefault();
         onSubmit(value);
      };

      const complete = () => {
         event.preventDefault();
         if (isEmpty) return;
         event.target.value = suggestions.suggestions[selectedIdx]?.[0] ?? value;
         setSearchState({ type: SelectedIdxActions.RESET });
      };

      const keyActions = {
         Enter: submit,
         NumpadEnter: submit,
         Tab: complete,
         ArrowRight: complete,
         Escape: () => {
            event.target.value = "";
            setStoreState({ type: SearchInputActions.HIDE });
         },
         ArrowDown: () => {
            event.preventDefault();
            setSearchState({ type: SelectedIdxActions.SET, payload: selectedIdx === suggestions.suggestions.length - 1 ? 0 : selectedIdx + 1 });
         },
         ArrowUp: () => {
            event.preventDefault();
            setSearchState({ type: SelectedIdxActions.SET, payload: selectedIdx === 0 ? suggestions.suggestions.length - 1 : selectedIdx - 1 });
         },
         Home: () => {
            event.preventDefault();
            setSearchState({ type: SelectedIdxActions.RESET });
         },
         End: () => {
            event.preventDefault();
            setSearchState({ type: SelectedIdxActions.SET, payload: suggestions.suggestions.length - 1 });
         },
      };

      keyActions[event.code]?.();
   };

   return (
      <textarea
         id="SearchInput"
         ref={searchInputRef}
         spellCheck="false"
         wrap="off"
         rows={1}
         onChange={onChange}
         onKeyDown={onKeyDown}
      />
   );
};

export default SearchInput;