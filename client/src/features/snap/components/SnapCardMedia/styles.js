import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPSm, isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ mixins, spacing, palette }) => ({
  'snap-media-container': {
    position: 'relative',
    cursor: 'pointer',

    [isVPMaxSm]: {
      cursor: 'initial',
    },
  },

  'snap-media': {
    width: '100%',
    display: 'block',
    aspectRatio: '1 / 1',
    objectFit: 'cover',

    [isVPXs]: {
      aspectRatio: '4 / 5',
    },
  },

  'flame-icon-container': {
    ...mixins.absCover,

    '& svg': {
      fontSize: spacing(20),
      [isVPSm]: {
        fontSize: spacing(30),
      },
    },
  },

  'flame-icon': {
    fill: ({ isLiked }) => palette[isLiked ? 'secondary' : 'primary'].main,
    stroke: ({ isLiked }) => (isLiked ? palette.secondary.dark : 'white'),
    strokeWidth: 0.2,
  },
}));
