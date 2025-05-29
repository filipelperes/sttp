import { useEffect } from "react";

const useSyncScroll = (sourceRef: React.RefObject<(HTMLElement | null)>, targetRef: React.RefObject<(HTMLElement | null)>) => {
   useEffect(() => {
      const handleScroll = () => {
         if (sourceRef.current && targetRef.current) {
            targetRef.current.scrollTop = sourceRef.current.scrollTop;
            targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
         }
      };
      sourceRef.current?.addEventListener("scroll", handleScroll);
      return () => sourceRef.current?.removeEventListener("scroll", handleScroll);
   }, [targetRef, sourceRef]);
};

export default useSyncScroll;
