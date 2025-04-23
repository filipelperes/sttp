import React, { useEffect, useState } from 'react';
import './style.css';

type ClockProps = {
   focus: boolean;
};

const Clock: React.FC<ClockProps> = ({ focus }) => {
   const [clock, setClock] = useState<string>("");

   useEffect(() => {
      const clock = setInterval(() => {
         const date = new Date();
         setClock(date.toLocaleTimeString([], { hourCycle: 'h23', hour: 'numeric', minute: '2-digit', second: '2-digit' }));
      }, 1000);

      return () => clearInterval(clock);
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