import { useEffect, useRef } from 'react';

/**
 * Hook that adds horizontal drag-to-scroll behavior to a container.
 * - Uses native event listeners to avoid React event ordering
 * - Disables pointer events on children during drag so button clicks don't fire
 * - 5px threshold distinguishes click from drag
 * - Touch scrolling works natively (overflow-x-auto)
 */
export const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const disableChildren = () => {
      for (let i = 0; i < el.children.length; i++) {
        (el.children[i] as HTMLElement).style.pointerEvents = 'none';
      }
    };

    const enableChildren = () => {
      for (let i = 0; i < el.children.length; i++) {
        (el.children[i] as HTMLElement).style.pointerEvents = '';
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      isDragging = false;
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX;
      const diff = Math.abs(x - startX);
      if (diff > 5) {
        isDragging = true;
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
        disableChildren();
        el.scrollLeft = scrollLeft - (x - startX) * 1.5;
      }
    };

    const onMouseUp = () => {
      if (isDragging) {
        // Reset after RAF so the pending click event is swallowed
        requestAnimationFrame(() => {
          el.style.cursor = '';
          el.style.userSelect = '';
          enableChildren();
        });
      }
      isDown = false;
      isDragging = false;
    };

    const onMouseLeave = () => {
      if (isDragging) {
        el.style.cursor = '';
        el.style.userSelect = '';
        enableChildren();
      }
      isDown = false;
      isDragging = false;
    };

    el.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.style.cursor = '';
      el.style.userSelect = '';
      enableChildren();
    };
  }, []);

  return { ref };
};
