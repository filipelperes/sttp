import { memo, useMemo, type RefObject } from "react";
import Icon from "@/components/Icon";
import type { IParsedInput } from "@/CommandPalette/types/ParsedInput";
import type whyDidYouRender from "@welldone-software/why-did-you-render";
import './style.css';

type IHighlightedOverlayProps = {
   value: string;
   services: IParsedInput["services"];
   ref: RefObject<(HTMLDivElement | null)>;
   bodyColor: string;
   whyDidYouRender?: typeof whyDidYouRender;
};

const HighlightedOverlay = memo(({ value, services, ref, bodyColor }: IHighlightedOverlayProps) => {
   const service = services.service?.[1];
   const name = service?.name;
   const nameLength = name?.length ?? 0;
   const style = service?.style;
   const fill = style?.backgroundColor;

   const [prefix, suffix] = useMemo(() => [
      value.substring(0, nameLength),
      value.substring(nameLength)
   ], [value, name]);

   return (
      <div ref={ref} id="Overlay-Wrapper" className="d-flex align-middle justify-center pos-relative">
         <div className="Overlay-Container">
            {!services.matched ? (
               <pre className="CommandPaletteInputText align-middle justify-center">{value}</pre>
            ) : (
               <pre className="CommandPaletteInputText align-middle justify-center">
                  <span
                     className="highlight align-middle justify-center"
                     style={{ color: bodyColor }}
                  >
                     <Icon icon={service?.icon} size={"3rem"} width={48} height={48} fill={fill} style={style} />
                     {prefix}
                  </span>
                  {suffix}
               </pre>
            )}
            {/* {(matched && !services.service?.[1]?.url?.query) && (
               <p>mensagem divertida e engraçada em ingles para caso não tenha query url</p>
            )} */}
         </div>
      </div>
   );
});

HighlightedOverlay.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "HighlightedOverlay",
};

export default HighlightedOverlay;
