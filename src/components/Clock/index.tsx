import { useEffect, useState } from 'react';
import './style.css';

const Clock = () => {
   const [clock, setClock] = useState<string>("");

   useEffect(() => {
      const clock = setInterval(() => {
         const date = new Date();
         setClock(date.toLocaleTimeString([], { hourCycle: 'h23', hour: 'numeric', minute: '2-digit', second: '2-digit' }));
      }, 1000);

      return () => clearInterval(clock);
   }, []);

   return (
      <time id="Clock" className="pos-relative">
         {clock.split(":").reduce((acc, part, index, array) => [
            ...acc,
            <span key={`digit-${index}`}>{part}</span>,
            (index < array.length - 1 && (<span key={`separator-${index}`} className="separator pos-relative"> : </span>))
         ], [] as React.ReactNode[])}
      </time>
   );
};

export default Clock;