import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPMinMd } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  // react-masonry-css styles:  https://www.npmjs.com/package/react-masonry-css
  'masonry-container': {
    display: 'flex',
    marginLeft: -30 /* gutter size offset */,
    width: 'auto',
  },

  'masonry-column': {
    paddingLeft: 30 /* gutter size */,
    backgroundClip: 'padding-box',

    '& > div': {
      margin: theme.spacing(3),

      [isVPMaxSm]: {
        marginBottom: theme.spacing(1),
      },
    },
  },
}));
