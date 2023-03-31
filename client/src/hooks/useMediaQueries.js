import { useMediaQuery } from '@material-ui/core';

export const useMediaQueries = (...mediaQueries) => {
  return mediaQueries.map(useMediaQuery);
};

/* e.g. In a component, instead of:

  const isXs = useMediaQuery(isVPXs);
  const isSm = useMediaQuery(isVPSm);
  const isMd = useMediaQuery(isVPMd);

  we can now do:

  const [isXs, isSm, isMd] = useMediaQueries(isVPXs, isVPSm, isVPMd)
*/
