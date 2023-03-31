import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';

export default makeStyles(({ palette }) => ({
  'snap-uploader': {
    // not available via CSS class API 🤷‍♀️ https://v4.mui.com/api/snackbar/#css
    '& .MuiPaper-root': {
      color: 'white',
      backgroundImage: `linear-gradient(135deg, ${palette.secondary.dark}, ${palette.primary.dark})`,
    },
  },

  // very difficult to style since MUI have a lot of baked in styles with media queries. Refer to overrides too.
  'snap-uploader-content': {
    flexGrow: 1,

    [isVPMinSm]: {
      width: 320,
    },

    '& .MuiSnackbarContent-message': {
      flexGrow: 1,
    },
  },
}));
