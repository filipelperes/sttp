import React, { useEffect, useRef } from 'react';
import './style.css';

const AutoComplete = ({ suggestions, selectedIndex, setSelectedIndex }) => {
   const itemRef = useRef([]);

   useEffect(() => itemRef.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
   }), [selectedIndex]);

   useEffect(() => setSelectedIndex(0), [suggestions, setSelectedIndex]);

   return (
      <>
         {suggestions.length > 0 &&
            <ul id="AutoComplete">
               {suggestions.map(([name], i) => (
                  <li
                     key={name}
                     ref={(el) => itemRef.current[i] = el}
                     className={i === selectedIndex ? "selected" : ""}
                  >
                     {name}
                  </li>
               ))}
            </ul>
         }
      </>
   );
};

export default AutoComplete;