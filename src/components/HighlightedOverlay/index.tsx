import { ServicesList } from "../../utils/services";
import { Icon } from "../Icon";
import './style.css';

type IHighlightedOverlayProps = {
   value: string;
};

const HighlightedOverlay = ({ value }: IHighlightedOverlayProps) => {
   // const matched = Object.entries(ServicesList).find(([, { name }]) => new RegExp(`^${name}([:/]*)`, 'i').test(value));
   const matched = Object.entries(ServicesList).find(([, { name }]) => value.toLowerCase().includes(name.toLowerCase()));

   if (!matched) return (<p className="searchInputText">{value}</p>);

   const [, { icon, name, style }] = matched;
   const fill = style?.backgroundColor || null;

   return (
      <div className="highlight-overlay d-flex align-middle justify-center pos-relative">
         <p className="searchInputText">
            <span
               className="highlight pos-relative"
               style={{ color: document.body.style.color }}
            >
               <Icon icon={icon} size={"3rem"} width={48} height={48} name={name} fill={fill} style={style} />
               {value.substring(0, name.length)}
            </span>
            {value.substring(name.length)}
         </p>
      </div>
   );
};

export default HighlightedOverlay;