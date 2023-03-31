import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ spacing, palette, transitions }) => ({
  'card-actions': {
    '& .like-action, .comment-action': {
      flexBasis: '50%',
      textAlign: 'center',

      '& button': {
        marginBottom: spacing(1),
      },

      // would have used <Typography> hack, but none of the variants really fit
      '& svg': {
        fontSize: spacing(4.5),

        [isVPXs]: {
          fontSize: spacing(4),
        },
      },
    },
  },

  'flame-icon': {
    fill: ({ isLiked }) => palette[isLiked ? 'secondary' : 'primary'].main,
    stroke: ({ isLiked }) => (isLiked ? palette.secondary.dark : 'white'),
    strokeWidth: 0.5,
    transition: transitions.create(['fill', 'stroke'], { duration: '0.5s' }),
  },

  'comment-icon': {
    paddingTop: 1,
  },
}));
