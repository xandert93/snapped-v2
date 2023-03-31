import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
  'profile-data': {
    '& .MuiSvgIcon-root': {
      color: palette.secondary.light,
      verticalAlign: -3,
      marginRight: spacing(1),
    },
  },
}));
