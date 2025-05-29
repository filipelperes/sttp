import { useCallback, useEffect, useLayoutEffect, useRef, type ChangeEvent, type MouseEvent, type KeyboardEvent } from "react";
import "./style.css";
import HighlightedOverlay from "@/features/CommandPalette/components/HighlightedOverlay";
import { clearTheme, handleSubmit, setTheme } from "@/CommandPalette/utils/CommandPalette";
import { RxChevronRight } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import useCommandPaletteStore, { CommandPaletteStoreSelector } from "@/CommandPalette/stores/CommandPaletteStore";
import { useShallow } from "zustand/shallow";
import useParsedInput from "@/CommandPalette/hooks/useParsedInput";
import useKeyboardActions from "@/features/CommandPalette/hooks/useKeyboardActions";
import useSyncScroll from "@/CommandPalette/hooks/useSyncScroll";

const CommandPaletteInput = () => {
   const OverlayWrapperRef = useRef<(HTMLDivElement | null)>(null);

   const { BodyColor, CommandPaletteInputRef, Value, SelectedIdx, setValue, setCommandPaletteState, setBodyColor, setShow, setSelectedIdx, Key } = useCommandPaletteStore(useShallow(CommandPaletteStoreSelector));
   const { suggestions, isEmpty, services } = useParsedInput(Value);

   useSyncScroll(CommandPaletteInputRef, OverlayWrapperRef);

   useLayoutEffect(() => {
      const BodyColor = getComputedStyle(document.body).color;
      setBodyColor(BodyColor);
   }, []);

   useEffect(() => {
      setValue(Key ?? "");
      if (CommandPaletteInputRef.current) CommandPaletteInputRef.current.value = Key ?? "";
      CommandPaletteInputRef.current?.focus?.();
      return () => {
         clearTheme();
         CommandPaletteInputRef.current?.blur?.();
         setCommandPaletteState({
            Value: "",
            SelectedIdx: 0
         });
      };
   }, []);

   useEffect(() => {
      if (suggestions.matched)
         setTheme((suggestions.suggestions[SelectedIdx]?.[1]?.style) || services.service?.[1]?.style);
      else
         clearTheme();
   });

   const ClearCommandPaletteInput = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.stopPropagation();
      CommandPaletteInputRef.current?.focus();
      if (isEmpty) return;
      if (CommandPaletteInputRef.current) CommandPaletteInputRef.current.value = "";
      setValue("");
   }, [isEmpty, setValue]);

   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      event.stopPropagation();
      setCommandPaletteState({
         Value: event.currentTarget.value,
         SelectedIdx: Math.max(0, Math.min(suggestions.suggestions.length - 1, SelectedIdx)),
         // isScroll: CommandPaletteInputRef.current.scrollWidth > CommandPaletteInputRef.current.clientWidth
      });
   };

   const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      event.stopPropagation();

      // if (
      //    services.matched && !services.service?.[1]?.url?.query &&
      //    /^[/w ]$/.test(event.key)
      // ) {
      //    event.preventDefault();
      //    return;
      // }

      const action = useKeyboardActions(event, CommandPaletteInputRef, Value, SelectedIdx, setSelectedIdx, setCommandPaletteState, setShow, suggestions);
      action?.[event.code as keyof typeof action]?.();
   };

   const handleButtonSubmit = useCallback(
      () =>
         (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
            handleSubmit(event, Value), []);

   return (
      <div id="CommandPaletteInput-Wrapper" className="d-flex justify-center align-middle pos-relative glass">
         <div id="CommandPaletteInputContainer" className="pos-relative">
            <HighlightedOverlay
               value={Value}
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
               onChange={handleChange}
               onKeyDown={handleKeyDown}
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
         <button className="d-flex align-middle pos-relative" onClick={handleButtonSubmit}>
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