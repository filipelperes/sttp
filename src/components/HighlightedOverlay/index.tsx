import type { RefObject } from "react";
import { useCommandPaletteContext } from "../../providers/CommandPaletteProvider/Context";
import { Icon } from "../Icon";
import './style.css';

type IHighlightedOverlayProps = {
   ref: RefObject<HTMLDivElement>;
};

const HighlightedOverlay = (({ ref }: IHighlightedOverlayProps) => {
   const { CommandPaletteState } = useCommandPaletteContext();
   const { parsedInput } = CommandPaletteState;
   const { value, services } = parsedInput;
   const { service, matched } = services;
   const name = service?.[1]?.name;
   const style = service?.[1]?.style;
   const fill = style?.backgroundColor;

   return (
      <div ref={ref} id="Overlay-Wrapper" className="d-flex align-middle justify-center">
         <div className="Overlay-Container">
            {!matched ? (
               <pre className="CommandPaletteInputText align-middle justify-center">{value}</pre>
            ) : (
               <pre className="CommandPaletteInputText align-middle justify-center">
                  <span
                     className="highlight align-middle justify-center"
                     style={{ color: document.body.style.color ?? "#d4d4d4" }}
                  >
                     <Icon icon={service?.[1]?.icon} size={"3rem"} width={48} height={48} fill={fill} style={style} />
                     {value.substring(0, name.length)}
                  </span>
                  {value.substring(name.length)}
               </pre>
            )}
         </div>
      </div>
   );
});

export default HighlightedOverlay;

