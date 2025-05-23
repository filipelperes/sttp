import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import "./style.css";
import HighlightedOverlay from "../../HighlightedOverlay";
import { localhost, parse, setTheme } from "../utils";
import { RxChevronRight } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import useCommandPaletteStore, { CommandPaletteStoreSelector } from "../../../stores/CommandPaletteStore";
import useAppStore, { AppStoreSelector } from "../../../stores/AppStore";
import { useShallow } from "zustand/shallow";

const CommandPaletteInput = () => {
   const OverlayWrapperRef = useRef<(HTMLDivElement | null)>(null);

   const { setOpenCommandPalette, Key } = useAppStore(useShallow(AppStoreSelector));

   const { BodyColor, CommandPaletteInputRef, ParsedInput, SelectedIdx, setParsedInput, setSelectedIdx, setCommandPaletteState } = useCommandPaletteStore(useShallow(CommandPaletteStoreSelector));

   const { isIP, isPartialURL, isStrictURL, suggestions, all, value, isEmpty, services } = ParsedInput;

   useLayoutEffect(() => {
      const BodyColor = getComputedStyle(document.body).color;
      setCommandPaletteState({
         BodyColor,
         ParsedInput: parse(Key ?? ""),
      });
      CommandPaletteInputRef.current.value = Key ?? "";
      CommandPaletteInputRef.current?.focus?.();
      return () => {
         document.body.style.removeProperty("background-image");
         document.body.style.removeProperty("background-color");
         document.body.style.removeProperty("color");
         CommandPaletteInputRef.current?.blur?.();
         setCommandPaletteState({
            ParsedInput: parse(""),
            SelectedIdx: 0
         });
      };
   }, []);

   useEffect(() => {
      setTheme((suggestions.matched && suggestions.suggestions[SelectedIdx]?.[1]?.style) || services.service?.[1]?.style);
   });

   const ClearCommandPaletteInput = useCallback(event => {
      event.stopPropagation();
      CommandPaletteInputRef.current.focus();
      if (isEmpty) return;
      CommandPaletteInputRef.current.value = "";
      setParsedInput(parse(""));
   }, [isEmpty, setParsedInput]);

   const handleSubmit = event => {
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
      setCommandPaletteState({
         ParsedInput: parse(event.target.value),
         SelectedIdx: Math.max(0, Math.min(suggestions.suggestions.length - 1, SelectedIdx))
      });
   };

   const onKeyDown = event => {
      event.stopPropagation();

      // if (
      //    services.matched && !services.service?.[1]?.url?.query &&
      //    /^[/w ]$/.test(event.key)
      // ) {
      //    event.preventDefault();
      //    return;
      // }

      const submit = event => {
         event.preventDefault();
         handleSubmit(event);
      };

      const keyActions = {
         Enter: submit,
         NumpadEnter: submit,
         Tab: () => {
            event.preventDefault();
            event.target.value = suggestions.suggestions[SelectedIdx]?.[1]?.name ?? event.target.value;
            setCommandPaletteState({
               ParsedInput: parse(event.target.value),
               SelectedIdx: 0
            });
         },
         Escape: () => {
            event.target.value = "";
            setOpenCommandPalette(false);
         },
         ArrowDown: () => {
            event.preventDefault();
            setSelectedIdx(SelectedIdx === suggestions.suggestions.length - 1 ? 0 : SelectedIdx + 1);
         },
         ArrowUp: () => {
            event.preventDefault();
            setSelectedIdx(SelectedIdx === 0 ? suggestions.suggestions.length - 1 : SelectedIdx - 1);
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
      <div id="CommandPaletteInput-Wrapper" className="d-flex justify-center align-middle pos-relative glass">
         <div id="CommandPaletteInputContainer" className="pos-relative">
            <HighlightedOverlay
               value={value}
               services={services}
               ref={OverlayWrapperRef}
               bodyColor={BodyColor}
            />
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
            className="d-flex align-middle clear"
            onClick={ClearCommandPaletteInput}
            style={{ opacity: isEmpty ? 0 : 1 }}
         >
            <IoMdCloseCircle />
         </button>
         <button className="d-flex align-middle pos-relative" onClick={handleSubmit}>
            <RxChevronRight />
         </button>
      </div>
   );
};

CommandPaletteInput.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "CommandPaletteInput",
};
export default CommandPaletteInput;