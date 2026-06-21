import { memo, useMemo, type RefObject } from "react";
import Icon from "@/components/Icon";
import type { IParsedInput } from "@/CommandPalette/types/ParsedInput";

interface IHighlightedOverlayProps {
   value: string;
   services: IParsedInput["services"];
   ref: RefObject<(HTMLDivElement | null)>;
   bodyColor: string;
}

const HighlightedOverlay = memo(({ value, services, ref, bodyColor }: IHighlightedOverlayProps) => {
   const service = services.service?.[1];
   const name = service?.name;
   const nameLength = name?.length ?? 0;
   const style = service?.style;
   const fill = style?.backgroundColor;

   const [prefix, suffix] = useMemo(() => [
      value.substring(0, nameLength),
      value.substring(nameLength)
   ], [value, nameLength]);

   return (
      <div 
         ref={ref} 
         id="Overlay-Wrapper" 
         className="absolute left-0 top-0 z-[1] pointer-events-none overflow-hidden w-full h-full rounded-tl-[2rem] sm:rounded-tl-[3rem]"
      >
         {!services.matched ? (
            <textarea
               className="absolute left-0 top-0 w-full h-full resize-none border-none outline-none bg-transparent rounded-tl-[2rem] sm:rounded-tl-[3rem] font-[inherit] font-bold text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] text-center tracking-[1.15px] whitespace-pre break-normal p-[6px] sm:p-[9px] [text-shadow:1px_1px_0px_rgba(0,0,0,0.5)] m-0"
               value={value}
               readOnly
               rows={1}
               wrap="off"
               style={{ WebkitTextFillColor: bodyColor || 'var(--color-foreground)', color: 'transparent' }}
            />
         ) : (
            <div className="absolute left-0 top-0 w-full h-full rounded-tl-[2rem] sm:rounded-tl-[3rem] font-[inherit] font-bold text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] text-center tracking-[1.15px] whitespace-pre break-normal p-[6px] sm:p-[9px] [text-shadow:1px_1px_0px_rgba(0,0,0,0.5)] m-0">
               <span
                  className="px-[8px] sm:px-[11px] py-[5px] sm:py-[7px] pl-[calc(0.8rem-3px)] sm:pl-[calc(1rem-3px)] h-full mr-[5px] sm:mr-[7px] inline-flex items-center capitalize glass z-[3] [border-style:inset] rounded-tl-[2rem] sm:rounded-tl-[3rem] absolute left-0 top-0 bottom-0"
                  style={{ color: bodyColor }}
               >
                  <Icon icon={service?.icon} size={"1.8rem"} width={32} height={32} fill={fill} style={style} />
                  {prefix}
               </span>
               <span className="opacity-0 pointer-events-none select-none">{prefix}</span>
               {suffix}
            </div>
         )}
      </div>
   );
});

HighlightedOverlay.displayName = 'HighlightedOverlay';
export default HighlightedOverlay;
