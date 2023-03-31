import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'snap-uploader-image': {
    display: 'block',
    borderRadius: theme.shape.borderRadius,

    height: theme.spacing(7),
    [isVPXs]: {
      height: theme.spacing(5),
    },
  },
}));
