import { memo, useCallback, useEffect, useRef } from 'react';
import './style.css';
import { createRoot } from 'react-dom/client';

const Clock = memo(() => {
   const clockRef = useRef<HTMLTimeElement>(null);
   const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

   const setClock = useCallback(() => {
      const formattedClock = new Date()
         .toLocaleTimeString([], {
            hourCycle: 'h23',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
         })
         .split(":")
         .reduce((acc, part, index, array) => [
            ...acc,
            <span key={`digit-${index}`}>{part}</span>,
            (index < array.length - 1 && (<span key={`separator-${index}`} className="separator pos-relative"> : </span>))
         ], [] as React.ReactNode[]);

      rootRef.current?.render?.(<>{formattedClock}</>);
   }, []);

   useEffect(() => {
      if (clockRef.current && !rootRef.current) rootRef.current = createRoot(clockRef.current);
      setClock();
      const interval = setInterval(setClock, 1000);
      return () => clearInterval(interval);
   }, []);

   return (
      <time
         ref={clockRef}
         id="Clock"
         className="pos-relative"
      />
   );
});

Clock.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "Clock",
};
export default Clock;