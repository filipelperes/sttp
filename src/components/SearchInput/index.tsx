import { z } from "zod";
import { ServicesList } from '../../utils/services';
import type { IParsedInput } from '../../utils/types/ParsedInput';
import { useCallback, useContext, useEffect, useRef } from "react";
import { SearchContext } from "../../utils/SearchProvider/Context";
import { StoreContext } from "../../StoreProvider/Context";
import { SearchInputActions } from "../../StoreProvider/Actions";
import { ParsedInputActions, SelectedIdxActions } from "../../utils/SearchProvider/Actions";
import "./style.css";
import HighlightedOverlay from "../HighlightedOverlay";

const SearchInput = () => {
   const searchInputRef = useRef<(HTMLTextAreaElement | null)>(null);
   const overlayRef = useRef<(HTMLDivElement | null)>(null);
   const { searchState, setSearchState } = useContext(SearchContext);
   const { storeState, setStoreState } = useContext(StoreContext);
   const { parsedInput, selectedIdx } = searchState;
   const { isIP, isPartialURL, isStrictURL, suggestions, all, value } = parsedInput;

   const setServiceTheme = useCallback(() => {
      const style =
         suggestions.suggestions[selectedIdx]?.[1]?.style
         || all.find(([, { name, pattern }]) => new RegExp(`^${name}([:/]*)`, 'i').test(value) || pattern.test(value))?.[1]?.style;
      document.body.style.backgroundImage = style?.backgroundImage ?? "none";
      document.body.style.backgroundColor = style?.backgroundColor ?? "#101010";
      document.body.style.color = style?.color ?? "#d4d4d4";
   }, [suggestions, selectedIdx, all, value]);

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

   function onSubmit(value) {
      if (isIP || isStrictURL || isPartialURL || value.startsWith("localhost")) {
         window.open(
            isStrictURL ? value : isPartialURL ? value.replace(/^(https?:\/\/)?(www\.)?/i, "https://www.") : `http${isIP && !["127.0.0.1", "127::1"].includes(value) ? "s" : ""}://${value}`,
            "_blank",
            "noopener, noreferrer"
         );
         return;
      }

      const matched = all.some(([, { name, url }]) => {
         const pattern = new RegExp(`^${name}([:/]*)`, 'i');
         if (!pattern.test(value)) return false;
         window.open(
            new RegExp(`^${name}([:/]+)`, 'i').test(value) && url.query ? `${url.query}${value.replace(pattern, "")}` : url.home,
            "_blank",
            "noopener, noreferrer"
         );
         return true;
      });
      if (matched) return;

      window.open(`https://google.com/search?q=${value}`, "_blank", "noopener, noreferrer");
   }

   function parse(value, code) {
      const all = Object.entries(ServicesList);
      const isEmpty = value.length === 0;

      const service = all.find(([, { pattern }]) => pattern?.test(value));
      const suggestions = all.filter(([, { name }]) =>
         (isEmpty && ["ArrowRight", "Tab"].includes(code)) || name.toLowerCase().match(value.toLowerCase())
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
         slash: value.includes("/"),
         collon: value.includes(":"),
         isEmpty,
         all,
         suggestions: {
            matched: (suggestions.length > 0),
            suggestions,
         },
         services: {
            matched: (service !== undefined),
            service,
            filtered: all.filter(([, { pattern }]) => pattern?.test(value)),
         }
      } as IParsedInput;
   }

   const onChange = (event) => {
      event.stopPropagation();
      setSearchState({
         type: ParsedInputActions.SET_PARSED,
         payload: parse(event.target.value, event.code)
      });
   };

   const onKeyDown = (event) => {
      event.stopPropagation();
      const submit = () => {
         event.preventDefault();
         onSubmit(event.target.value);
      };

      const complete = () => {
         event.target.value = suggestions.suggestions[selectedIdx]?.[1]?.name ?? event.target.value;
         setSearchState({
            type: ParsedInputActions.SET_PARSED,
            payload: parse(event.target.value, event.code)
         });
         setSearchState({ type: SelectedIdxActions.RESET });
      };

      const keyActions = {
         Enter: submit,
         NumpadEnter: submit,
         Tab: () => {
            event.preventDefault();
            complete();
         },
         ArrowRight: () => {
            if (suggestions.matched) event.preventDefault();
            complete();
         },
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
            if (suggestions.matched) setSearchState({ type: SelectedIdxActions.RESET });
            else {
               searchInputRef.current?.setSelectionRange(0, 0);
               searchInputRef.current.scroll({
                  behavior: "smooth",
                  left: 0
               });
            }
         },
         End: () => {
            event.preventDefault();
            if (suggestions.matched) setSearchState({ type: SelectedIdxActions.SET, payload: suggestions.suggestions.length - 1 });
            else {
               searchInputRef.current?.setSelectionRange(event.target.value.length, event.target.value.length);
               searchInputRef.current.scroll({
                  behavior: "smooth",
                  left: 99999
               });
            }
         },
      };

      keyActions[event.code]?.();
   };

   const onScroll = () => {
      if (searchInputRef.current && overlayRef.current) {
         overlayRef.current.scrollTop = searchInputRef.current.scrollTop;
         overlayRef.current.scrollLeft = searchInputRef.current.scrollLeft;
      }
   };


   return (
      <div className="SearchInput-Wrapper d-flex justify-center align-middle pos-relative">
         <div ref={overlayRef} className="overlay d-flex justify-center align-middle">
            <HighlightedOverlay value={value} />
         </div>
         <textarea
            id="SearchInput"
            className="searchInputText"
            ref={searchInputRef}
            spellCheck="false"
            wrap="off"
            rows={1}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onScroll={onScroll}
         />
      </div>
   );
};

export default SearchInput;