import { useRef } from 'react';
import { useCallback } from 'react';

export function useInfiniteScroll({ config, callback, hasMore, dependencies = [] }) {
  const observerRef = useRef();

  const observe = useCallback(
    (node) => {
      if (node && hasMore) {
        observerRef.current = new IntersectionObserver(handleIntersection, config);
        observerRef.current.observe(node);

        function handleIntersection([entry]) {
          if (entry.isIntersecting) {
            observerRef.current.unobserve(node);
            callback();
          }
        }
      } else observerRef.current?.disconnect();
    },
    [hasMore, ...dependencies]
  );

  return observe;
}

/* 
previously had: `const observerRef = useRef()` to hold the observer and supply it in the
return value e.g. `return [observerRef, observe]`.

But I don't think components ever need to actually access the observer instance, so
I have removed that.

*/
