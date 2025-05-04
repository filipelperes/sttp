import { useContext, useEffect, useState } from 'react';
import './style.css';
import { StoreContext } from '../../StoreProvider/Context';

const Clock = () => {
   const { storeState } = useContext(StoreContext);
   const { focusSearchInput } = storeState;
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
         {!focusSearchInput && (
            <div className="Clock-Wrapper d-flex justify-center">
               <time id="Clock">
                  {clock.split(":").reduce((acc, part, index, array) => [
                     ...acc,
                     <span key={`digit-${index}`}>{part}</span>,
                     (index < array.length - 1 && (<span key={`separator-${index}`} className="separator"> : </span>))
                  ], [] as React.ReactNode[])}
               </time>
            </div>
         )}
      </>
   );
};

export default Clock;