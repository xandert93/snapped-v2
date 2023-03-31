import { useEffect } from 'react';

export const useMountEffect = (cb) => {
  useEffect(cb, []);
};
