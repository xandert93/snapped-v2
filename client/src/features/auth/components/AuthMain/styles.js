import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';

export default makeStyles(({ palette }) => ({
  'auth-main': {
    minHeight: '100vh',

    [isVPMinSm]: {
      backgroundImage: `linear-gradient(135deg, ${palette.secondary.dark}, ${palette.primary.dark})`,
    },
  },
}));
