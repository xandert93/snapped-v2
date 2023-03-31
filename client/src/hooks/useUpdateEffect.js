import { useEffect, useRef } from 'react';

export const useUpdateEffect = (cb, deps) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current ? (isFirstRender.current = false) : cb();
  }, deps);
};
