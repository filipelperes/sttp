import { ServicesList } from "../../utils/services";
import { Icon } from "../Icon";
import './style.css';

const HighlightedOverlay = ({ value }: { value: string; }) => {
   const matched = Object.entries(ServicesList).find(([, { name }]) => new RegExp(`^${name.toLowerCase()}([:/]*)`, 'i').test(value.toLowerCase()));

   if (!matched) return (<p className="searchInputText">{value}</p>);

   const [, { icon, name }] = matched;
   const regex = new RegExp(`^${name}([:/]*)`, 'i');

   return (
      <div className="highlight-overlay d-flex align-middle justify-center">
         <p className="searchInputText">
            <span
               className="highlight"
               style={{ color: document.body.style.getPropertyValue("color") }} // left: `-${svgr.includes(name) ? "3rem" : "48px"}`
            >
               <Icon icon={icon} size={"3rem"} width={48} height={48} name={name} />
               {value.match(regex)?.["input"] ?? ""}
            </span>
            {value.replace(regex, "")}
         </p>
      </div>
   );
};

export default HighlightedOverlay;