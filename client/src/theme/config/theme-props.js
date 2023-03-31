import { Card, CircularProgress } from '@material-ui/core';

export const themeProps = {
  MuiTextField: {
    variant: 'outlined',
    fullWidth: true,
    required: true,
    autoComplete: 'off', //particularly on mobile, if a lot of options available, makes UI ugly
  },

  MuiBottomNavigationAction: {
    disableRipple: true,
  },

  MuiAlert: {
    elevation: 8,
    variant: 'standard', //'standard*' || 'outlined' || 'filled' (ugly)
    iconMapping: {
      info: <CircularProgress />, //will represent loading. Would love to name the key "requesting", but can't find how to create custom severity
    },
  },

  MuiCircularProgress: {
    size: '1em', //*40 (Number form sets width and height to 40px each. String form e.g. "1em" sets them to 1em each. Root element has no font-size applied, so it inherits from parent. Size will now depend on font-size of parent element - more responsive.)
    thickness: 5, //3.6 (mapped to CSS stroke-width of <svg><Circle></svg> )
  },

  MuiDialog: {
    PaperComponent: Card, // Paper* - will now use our App's <Card/> instead, which provides 20px border-radius
    fullWidth: true, //"false"* makes Dialog width dependent on content. For UI consistency, "true" is better. Now uses width specified by <Dialog>' "maxWidth" prop
    transitionDuration: 300, //*225
  },

  MuiList: {
    disablePadding: true, //otherwise applies "padding: spacing(1, 0)" which looks a bit shit
  },

  MuiLink: {
    underline: 'none', // 'hover'*
  },

  MuiSkeleton: {
    animation: 'wave',
  },
};
