import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'snap-media': {
    maxHeight: '40vh',
    maxWidth: '100%',
    display: 'block',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,

    [isVPXs]: {
      maxHeight: '45vh',
    },
  },

  'tag-input-helper-text': {
    marginTop: theme.spacing(1),
    marginBottom: 0, //*-20px for some reason
    color: theme.palette.secondary.light,
  },
}));
