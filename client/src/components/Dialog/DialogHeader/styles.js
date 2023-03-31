import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPXs } from '../../../theme/media-queries';

export default makeStyles(
  ({ palette, spacing }) => ({
    'dialog-header-content': {
      color: 'white',
      '& h2': {
        flexGrow: 1,
        fontWeight: 700,
        letterSpacing: 3,
        [isVPMaxSm]: {
          letterSpacing: 2,
        },

        //styles applied if title is the second child in the toolbar (i.e. is not alone! and preceded by another element)
        '&:nth-child(2)': {
          //toolbar paddingL & paddingR are 24px @ md+ and 16px @ xs-sm. This makes spacing to the preceding element look even
          paddingLeft: spacing(3),
          [isVPXs]: {
            paddingLeft: spacing(2),
          },
        },

        '&:last-child': {
          paddingRight: spacing(5),
          [isVPXs]: {
            paddingRight: spacing(4),
          },
        },
      },
    },
  }),
  { index: 1 }
);
