import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, shadows }) => ({
  tooltip: {
    backgroundImage: `linear-gradient(135deg, ${palette.secondary.main}, ${palette.primary.main})`,
    color: 'white',
    border: `1px solid white`,
    boxShadow: shadows[8],
  },
  'tooltip-arrow': {
    color: 'inherit',
  },
}));
