import { useEffect, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';

const ITEM_MIN_WIDTH = 250 as const;

export const useSlider = ({ items }: { items: unknown[] }) => {
  const containerElementRef = useRef<HTMLUListElement>(null);
  const [visibleItemCount, setVisibleItemCount] = useState(1);
  const [_slideIndex, setSlideIndex] = useState(0);
  const slideIndex = Math.min(Math.max(0, _slideIndex), items.length - 1);

  useEffect(() => {
    setVisibleItemCount(() => {
      const containerWidth = containerElementRef.current?.getBoundingClientRect().width ?? 0;
      return Math.max(Math.floor(containerWidth / ITEM_MIN_WIDTH), 1);
    });

    const updateVisibleItemCount = throttle(500, () => {
      setVisibleItemCount(() => {
        const containerWidth = containerElementRef.current?.getBoundingClientRect().width ?? 0;
        return Math.max(Math.floor(containerWidth / ITEM_MIN_WIDTH), 1);
      });
    });

    window.addEventListener('resize', updateVisibleItemCount);

    return () => window.removeEventListener('resize', updateVisibleItemCount);
  }, []);

  return {
    containerElementRef,
    setSlideIndex,
    slideIndex,
    visibleItemCount,
  };
};
