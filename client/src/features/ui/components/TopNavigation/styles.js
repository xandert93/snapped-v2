import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles(
  ({ palette, spacing }) => {
    const borderBottomStyles = {
      border: '0px solid',
      borderWidth: '3px',
      borderLeft: '0',
      borderRight: '0',
      borderTop: '0',
      borderImageSource: `linear-gradient(135deg, ${palette.secondary.light}, ${palette.primary.light})`,
      borderImageSlice: '1',
    };

    return {
      'app-bar': {
        ...(palette.type === 'dark' && borderBottomStyles),
        [isVPXs]: borderBottomStyles,
      },

      toolbar: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
      },
    };
  },
  { index: 1 }
);
