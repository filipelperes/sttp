import { ServicesList } from "../../utils/services";
import { Icon } from "../Icon";
import './style.css';

const HighlightedOverlay = ({ value }: { value: string; }) => {
   const matched = Object.entries(ServicesList).find(([, { name }]) => new RegExp(`^${name.toLowerCase()}([:/]*)`, 'i').test(value.toLowerCase()));

   if (!matched) return (<p className="searchInputText">{value}</p>);

   const [, { icon, name }] = matched;

   return (
      <div className="highlight-overlay d-flex align-middle justify-center">
         <p className="searchInputText">
            <span
               className="highlight pos-relative"
               style={{ color: document.body.style.getPropertyValue("color") }}
            >
               <Icon icon={icon} size={"3rem"} width={48} height={48} name={name} />
               {value.substring(0, name.length)}
            </span>
            {value.substring(name.length)}
         </p>
      </div>
   );
};

export default HighlightedOverlay;