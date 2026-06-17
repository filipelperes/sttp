import { useEffect } from "react";

const useSyncScroll = (sourceRef: React.RefObject<(HTMLElement | null)>, targetRef: React.RefObject<(HTMLElement | null)>) => {
   useEffect(() => {
      const sourceEl = sourceRef.current;
      if (!sourceEl || !targetRef.current) return;
      const handleScroll = () => {
         if (targetRef.current) {
            targetRef.current.scrollTop = sourceEl.scrollTop;
            targetRef.current.scrollLeft = sourceEl.scrollLeft;
         }
      };
      sourceEl.addEventListener("scroll", handleScroll);
      return () => sourceEl.removeEventListener("scroll", handleScroll);
   }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSyncScroll;
