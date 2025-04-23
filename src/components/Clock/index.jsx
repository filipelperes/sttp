import React, { useEffect, useState } from 'react';
import './style.css';

const Clock = ({ focus }) => {
   const [clock, setClock] = useState();

   useEffect(() => {
      setInterval(() => {
         const date = new Date();
         setClock(date.toLocaleTimeString([], { hourCycle: 'h23', hour: 'numeric', minute: '2-digit', second: '2-digit' }));
      }, 1000);
   }, []);

   return (
      <>
         {!focus && (
            <time id="Clock">
               {clock}
            </time>
         )}
      </>
   );
};

export default Clock;