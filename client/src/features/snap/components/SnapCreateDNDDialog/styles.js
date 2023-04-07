import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../../../theme/media-queries';

export default makeStyles(({ palette, spacing }) => ({
  dnd: {
    padding: spacing(5),
    [isVPMaxSm]: { padding: spacing(3) },
  },

  'dnd-title': {
    backgroundImage: `linear-gradient(135deg, ${palette.secondary.main}, ${palette.primary.main})`, //*** repeated */
    '-webkit-background-clip': 'text',
    color: 'transparent',
  },
}));
