import { useRef } from "react";
import "./style.css";
import HighlightedOverlay from "../HighlightedOverlay";
import { localhost, parse } from "../CommandPalette/utils";
import { RxChevronRight } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import { useCommandPaletteStore } from "../../stores/CommandPaletteStore";
import { useAppStore } from "../../stores/AppStore";

const CommandPaletteInput = () => {
   const OverlayWrapperRef = useRef<(HTMLDivElement | null)>(null);

   const CommandPaletteInputRef = useCommandPaletteStore(s => s.CommandPaletteInputRef);
   const parsedInput = useCommandPaletteStore(s => s.parsedInput);
   const selectedIdx = useCommandPaletteStore(s => s.selectedIdx);

   const setParsedInput = useCommandPaletteStore(s => s.setParsedInput);
   const setSelectedIdx = useCommandPaletteStore(s => s.setSelectedIdx);
   const setFocusSearchInput = useAppStore(s => s.setFocusSearchInput);

   const { isIP, isPartialURL, isStrictURL, suggestions, all, value, isEmpty, services } = parsedInput;

   const ClearCommandPaletteInput = event => {
      event.stopPropagation();
      CommandPaletteInputRef.current.focus();
      if (isEmpty) return;
      CommandPaletteInputRef.current.value = "";
      setParsedInput(parse(""));
   };

   const onSubmit = event => {
      event.stopPropagation();
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

   const onChange = event => {
      event.stopPropagation();
      setParsedInput(parse(event.target.value));
      setSelectedIdx(Math.max(0, Math.min(suggestions.suggestions.length - 1, selectedIdx)));
   };

   const onKeyDown = event => {
      event.stopPropagation();

      // if (
      //    services.matched && !services.service?.[1]?.url?.query &&
      //    !event.ctrlKey && !event.metaKey && event.key.length === 1
      // ) {
      //    event.preventDefault();
      //    return;
      // }

      const submit = event => {
         event.preventDefault();
         onSubmit(~event);
      };

      const keyActions = {
         Enter: submit,
         NumpadEnter: submit,
         Tab: () => {
            event.preventDefault();
            event.target.value = suggestions.suggestions[selectedIdx]?.[1]?.name ?? event.target.value;
            setParsedInput(parse(event.target.value));
            setSelectedIdx(0);
         },
         Escape: () => {
            event.target.value = "";
            setFocusSearchInput(false);
         },
         ArrowDown: () => {
            event.preventDefault();
            setSelectedIdx(selectedIdx === suggestions.suggestions.length - 1 ? 0 : selectedIdx + 1);
         },
         ArrowUp: () => {
            event.preventDefault();
            setSelectedIdx(selectedIdx === 0 ? suggestions.suggestions.length - 1 : selectedIdx - 1);
         },
         Home: () => {
            event.preventDefault();
            if (suggestions.matched) setSelectedIdx(0);
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
            if (suggestions.matched) setSelectedIdx(suggestions.suggestions.length - 1);
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
      <div id="CommandPaletteInput-Wrapper" className="d-flex justify-center align-middle pos-relative">
         <div id="CommandPaletteInputContainer" className="pos-relative">
            <HighlightedOverlay ref={OverlayWrapperRef} />
            <textarea
               ref={CommandPaletteInputRef}
               id="CommandPaletteInput"
               className={`CommandPaletteInputText`}
               spellCheck={false}
               data-gramm={false} // Desativa Grammarly
               data-lt-active={false} // Desativa LanguageTool
               aria-hidden={false}
               autoCorrect="off"
               wrap="off"
               rows={1}
               onChange={onChange}
               onKeyDown={onKeyDown}
               onScroll={onScroll}
               // style={{ textIndent: services.matched ? value.length > services.service[1].name.length ? "5.75rem" : "3.125rem" : "0" }}
               style={{ textIndent: services.matched ? "-9rem" : "0" }}
            />
         </div>
         <button
            className="clear"
            onClick={ClearCommandPaletteInput}
            style={{ opacity: isEmpty ? 0 : 1 }}
         >
            <IoMdCloseCircle />
         </button>
         <button className="pos-relative" onClick={onSubmit}>
            <RxChevronRight />
         </button>
      </div>
   );
};

export default CommandPaletteInput;