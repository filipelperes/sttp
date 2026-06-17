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
      <div ref={ref} id="Overlay-Wrapper" className="flex items-center justify-center absolute pointer-events-none z-[1] overflow-hidden w-full h-full mr-[3rem]">
         <div className="min-w-full rounded-tl-[3rem]">
            {!services.matched ? (
               <pre className="font-bold text-[3rem] text-center tracking-[1.15px] whitespace-pre break-normal min-w-full p-[9px] inline-flex items-center justify-center overflow-visible [text-shadow:1px_1px_0px_rgba(0,0,0,0.5)]">
                  {value}
               </pre>
            ) : (
               <pre className="font-bold text-[3rem] text-center tracking-[1.15px] whitespace-pre break-normal min-w-full p-[9px] inline-flex items-center justify-center overflow-visible [text-shadow:1px_1px_0px_rgba(0,0,0,0.5)]">
                  <span
                     className="px-[11px] py-[7px] pl-[calc(1rem-3px)] h-full mr-[7px] inline-flex capitalize bg-scrollbar z-[3] [border-style:inset] rounded-tl-[3rem] left-0 top-0 bottom-0"
                     style={{
                        color: bodyColor,
                        position: "fixed"
                     }}
                  >
                     <Icon icon={service?.icon} size={"3rem"} width={48} height={48} fill={fill} style={style} />
                     {prefix}
                  </span>
                  {suffix}
               </pre>
            )}
         </div>
      </div>
   );
});

HighlightedOverlay.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "HighlightedOverlay",
};

export default HighlightedOverlay;
