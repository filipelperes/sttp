import type { RefObject } from "react";
import { Icon } from "../Icon";
import './style.css';
import { useCommandPaletteStore } from "../../stores/CommandPaletteStore";

type IHighlightedOverlayProps = {
   ref: RefObject<HTMLDivElement>;
};

const HighlightedOverlay = (({ ref }: IHighlightedOverlayProps) => {
   const parsedInput = useCommandPaletteStore(s => s.parsedInput);

   const { value, services } = parsedInput;
   const { service, matched } = services;
   const name = service?.[1]?.name;
   const style = service?.[1]?.style;
   const fill = style?.backgroundColor;

   return (
      <div ref={ref} id="Overlay-Wrapper" className="d-flex align-middle justify-center pos-relative">
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
            {/* {(matched && !services.service?.[1]?.url?.query) && (
               <p>mensagem divertida e engraçada em ingles para caso não tenha query url</p>
            )} */}
         </div>
      </div>
   );
});

export default HighlightedOverlay;

