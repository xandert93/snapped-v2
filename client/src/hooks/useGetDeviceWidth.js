import { useState, useEffect } from 'react';

export const useGetDeviceWidth = () => {
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    //in case user is on desktop and resizes window, we must update state:
    window.onresize = () => {
      setInnerWidth(window.innerWidth);
    };
  }, []);

  return innerWidth;
};
