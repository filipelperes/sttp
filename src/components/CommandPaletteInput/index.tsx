import { useContext, useEffect, useRef, type RefObject } from "react";
import { CommandPaletteContext } from "../../providers/CommandPaletteProvider/Context";
import { StoreContext } from "../../providers/StoreProvider/Context";
import { SearchInputActions } from "../../providers/StoreProvider/Actions";
import { ParsedInputActions, SelectedIdxActions } from "../../providers/CommandPaletteProvider/Actions";
import "./style.css";
import HighlightedOverlay from "../HighlightedOverlay";
import { localhost, parse, resetStyle, setTheme } from "../CommandPalette/utils";
import { Icon } from "../Icon";
import { RxChevronRight } from "react-icons/rx";

const CommandPaletteInput = ({ CommandPaletteInputRef }: { CommandPaletteInputRef: RefObject<HTMLTextAreaElement | null>; }) => {
   const overlayRef = useRef<(HTMLDivElement | null)>(null);
   const submitIconRef = useRef<HTMLSpanElement | HTMLImageElement | SVGElement>(null);
   const { CommandPaletteState, setCommandPaletteState } = useContext(CommandPaletteContext);
   const { storeState, setStoreState } = useContext(StoreContext);
   const { parsedInput, selectedIdx } = CommandPaletteState;
   const { isIP, isPartialURL, isStrictURL, suggestions, all, value, isEmpty } = parsedInput;

   const handleClick = () => !isEmpty && (onSubmit(CommandPaletteInputRef.current.value));

   setTheme(
      suggestions.suggestions[selectedIdx]?.[1]?.style
      || all.find(([, { name }]) => value.toLowerCase().includes(name.toLowerCase()))?.[1]?.style
   );

   if (suggestions.matched) document.body.classList.add("show-suggestions");
   else document.body.classList.remove("show-suggestions");

   useEffect(() => {
      submitIconRef.current?.addEventListener("click", handleClick);
      return () => submitIconRef.current?.removeEventListener("click", handleClick);
   }, []);

   useEffect(() => {
      if (storeState.focusSearchInput) {
         document.body.classList.add("focused");
         CommandPaletteInputRef.current?.focus();
      }
      else {
         CommandPaletteInputRef.current?.blur();
         setCommandPaletteState({ type: ParsedInputActions.RESET_PARSED });
         setCommandPaletteState({ type: SelectedIdxActions.RESET });
      }
      return () => {
         resetStyle();
         document.body.classList.remove("focused");
      };
   }, [storeState.focusSearchInput, setCommandPaletteState, CommandPaletteInputRef]);

   function onSubmit(value) {
      if (isIP || isStrictURL || isPartialURL) { //127::1, ::1, 127...1, 127..1 para 127.0.0.1
         const match = localhost.find(v => value.includes(v));
         window.open(
            isStrictURL || (isIP && value.includes("localhost")) ? value
               : isPartialURL ? value.replace(/^(https?:\/\/)?(www\.)?/i, "https://www.")
                  : isIP && localhost.includes(value) ? value.replace(new RegExp(`^((?:[:.])?(${match}))`, 'i'), "127.0.0.1")
                     : `https://${value}`,
            "_blank",
            "noopener, noreferrer"
         );
         return;
      }

      const matched = all.some(([, { name, url }]) => {
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
      if (matched) return;

      window.open(`https://google.com/search?q=${value}`, "_blank", "noopener, noreferrer");
   }

   const onChange = (event) => {
      event.stopPropagation();

      setCommandPaletteState({
         type: ParsedInputActions.SET_PARSED,
         payload: parse(event.target.value)
      });

      CommandPaletteInputRef.current && all.some(([, { name }]) =>
         event.target.value.toLowerCase().includes(name.toLowerCase()) && event.target.value.length > name.length
      )
         ? CommandPaletteInputRef.current.style.setProperty("margin-left", "5.5rem")
         : CommandPaletteInputRef.current.style.removeProperty("margin-left");
   };

   const onKeyDown = (event) => {
      event.stopPropagation();
      const submit = () => {
         event.preventDefault();
         onSubmit(event.target.value);
         CommandPaletteInputRef.current.value = "";
      };

      const keyActions = {
         Enter: submit,
         NumpadEnter: submit,
         Tab: () => {
            event.preventDefault();
            event.target.value = suggestions.suggestions[selectedIdx]?.[1]?.name ?? event.target.value;
            setCommandPaletteState({
               type: ParsedInputActions.SET_PARSED,
               payload: parse(event.target.value)
            });
            setCommandPaletteState({ type: SelectedIdxActions.RESET });
         },
         Escape: () => {
            event.target.value = "";
            setStoreState({ type: SearchInputActions.HIDE });
         },
         ArrowDown: () => {
            event.preventDefault();
            setCommandPaletteState({ type: SelectedIdxActions.SET, payload: selectedIdx === suggestions.suggestions.length - 1 ? 0 : selectedIdx + 1 });
         },
         ArrowUp: () => {
            event.preventDefault();
            setCommandPaletteState({ type: SelectedIdxActions.SET, payload: selectedIdx === 0 ? suggestions.suggestions.length - 1 : selectedIdx - 1 });
         },
         Home: () => {
            event.preventDefault();
            if (suggestions.matched) setCommandPaletteState({ type: SelectedIdxActions.RESET });
            else {
               CommandPaletteInputRef.current?.setSelectionRange(0, 0);
               CommandPaletteInputRef.current.scroll({
                  behavior: "smooth",
                  left: 0
               });
            }
         },
         End: () => {
            event.preventDefault();
            if (suggestions.matched) setCommandPaletteState({ type: SelectedIdxActions.SET, payload: suggestions.suggestions.length - 1 });
            else {
               CommandPaletteInputRef.current?.setSelectionRange(event.target.value.length, event.target.value.length);
               CommandPaletteInputRef.current.scroll({
                  behavior: "smooth",
                  left: 999999
               });
            }
         },
      };

      keyActions[event.code]?.();
   };

   const onScroll = () => {
      if (CommandPaletteInputRef.current && overlayRef.current) {
         overlayRef.current.scrollTop = CommandPaletteInputRef.current.scrollTop;
         overlayRef.current.scrollLeft = CommandPaletteInputRef.current.scrollLeft;
      }
   };


   return (
      <div id="CommandPaletteInput-Wrapper" className="d-flex justify-center align-middle pos-relative">
         <div ref={overlayRef} className="overlay d-flex justify-center align-middle">
            <HighlightedOverlay value={value} />
         </div>
         <textarea
            ref={CommandPaletteInputRef}
            id="CommandPaletteInput"
            className="searchInputText"
            spellCheck="false"
            wrap="off"
            rows={1}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onScroll={onScroll}
         />
         <Icon icon={RxChevronRight} size="3rem" ref={submitIconRef} />
      </div>
   );
};

export default CommandPaletteInput;