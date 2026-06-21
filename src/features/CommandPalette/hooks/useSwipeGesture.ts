import { useEffect, useRef } from 'react';

interface ISwipeConfig {
  threshold?: number; // minimum px to trigger
  onSwipeDown: () => void;
}

/**
 * Detects a swipe-down gesture on the document body.
 * Useful for mobile users to open the command palette.
 */
const useSwipeGesture = ({ threshold = 60, onSwipeDown }: ISwipeConfig) => {
  const startY = useRef<number | null>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      startY.current = touch.clientY;
      startX.current = touch.clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (startY.current === null || startX.current === null) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      const deltaY = touch.clientY - startY.current;
      const deltaX = Math.abs(touch.clientX - startX.current);

      // Only trigger if swipe is mostly vertical (|dx| < |dy| * 2)
      if (deltaY > threshold && deltaX < deltaY * 2) {
        onSwipeDown();
      }

      startY.current = null;
      startX.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold, onSwipeDown]);
};

export default useSwipeGesture;
