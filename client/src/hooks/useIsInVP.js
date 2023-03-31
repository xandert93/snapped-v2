import { useEffect, useState } from 'react';

export const useIsInVP = (ref, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin,
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref.current, rootMargin]);

  return isVisible;
};
