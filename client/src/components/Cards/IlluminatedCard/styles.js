import { alpha, makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, shadows }) => ({
  'illuminated-card': {
    boxShadow: () => {
      const isLightMode = palette.type === 'light';
      const darkShadow = `0px 0px 3px 2px ${alpha(palette.primary.main, 0.5)}`;
      const lightShadow = shadows[4];

      return isLightMode ? lightShadow : darkShadow;
    },
  },
}));
