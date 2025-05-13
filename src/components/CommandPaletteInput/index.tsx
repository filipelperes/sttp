import { useRef } from "react";
import { useCommandPaletteContext } from "../../providers/CommandPaletteProvider/Context";
import { useStoreContext } from "../../providers/StoreProvider/Context";
import { SearchInputActions } from "../../providers/StoreProvider/Actions";
import { ParsedInputActions, SelectedIdxActions } from "../../providers/CommandPaletteProvider/Actions";
import "./style.css";
import HighlightedOverlay from "../HighlightedOverlay";
import { localhost, parse } from "../CommandPalette/utils";
import { Icon } from "../Icon";
import { RxChevronRight } from "react-icons/rx";

const CommandPaletteInput = () => {
   const OverlayWrapperRef = useRef<(HTMLDivElement | null)>(null);
   const { CommandPaletteState, setCommandPaletteState, CommandPaletteInputRef } = useCommandPaletteContext();
   const { setStoreState } = useStoreContext();
   const { parsedInput, selectedIdx } = CommandPaletteState;
   const { isIP, isPartialURL, isStrictURL, suggestions, all, value, isEmpty, services } = parsedInput;

   const onSubmit = () => {
      if (isEmpty) return;
      if (isIP || isStrictURL || isPartialURL) { //127::1, ::1, 127...1, 127..1 para 127.0.0.1
         const match = localhost.find(ip => value.includes(ip));
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
   };

   const onChange = (event) => {
      event.stopPropagation();
      setCommandPaletteState({
         type: ParsedInputActions.SET_PARSED,
         payload: parse(event.target.value)
      });
      setCommandPaletteState({
         type: SelectedIdxActions.SET,
         payload: Math.max(0, Math.min(suggestions.suggestions.length - 1, selectedIdx))
      });
   };

   const onKeyDown = (event) => {
      event.stopPropagation();
      const submit = () => {
         event.preventDefault();
         onSubmit();
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
               CommandPaletteInputRef.current?.scroll({
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
               CommandPaletteInputRef.current?.scroll({
                  behavior: "smooth",
                  left: 999999
               });
            }
         },
      };

      keyActions[event.code]?.();
   };

   const onScroll = () => {
      if (CommandPaletteInputRef.current && OverlayWrapperRef.current) {
         OverlayWrapperRef.current.scrollTop = CommandPaletteInputRef.current.scrollTop;
         OverlayWrapperRef.current.scrollLeft = CommandPaletteInputRef.current.scrollLeft;
      }
   };

   return (
      <div id="CommandPaletteInput-Wrapper" className="d-flex justify-center align-middle">
         <div id="CommandPaletteInputContainer" className="pos-relative">
            <HighlightedOverlay ref={OverlayWrapperRef} />
            <textarea
               ref={CommandPaletteInputRef}
               id="CommandPaletteInput"
               className={`CommandPaletteInputText`}
               spellCheck="false"
               wrap="off"
               rows={1}
               onChange={onChange}
               onKeyDown={onKeyDown}
               onScroll={onScroll}
               style={{ textIndent: services.matched ? value.length > services.service[1].name.length ? "5.75rem" : "3.125rem" : "0" }}
            />
         </div>
         <button className="pos-relative" onClick={onSubmit}>
            <Icon icon={{ icon: RxChevronRight, type: "react-icons" }} size="3rem" />
         </button>
      </div>
   );
};

export default CommandPaletteInput;