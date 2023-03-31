import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'bottom-nav': {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1200,

    '& .MuiSvgIcon-root': {
      fontSize: theme.spacing(5),
      [isVPXs]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));
