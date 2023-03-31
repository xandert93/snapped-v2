import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ palette }) => ({
  'auth-main': {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(135deg, ${palette.secondary.dark}, ${palette.primary.dark})`,

    [isVPXs]: {
      background: palette.background.paper, // so it blends in the <AuthPaper>
    },
  },
}));
