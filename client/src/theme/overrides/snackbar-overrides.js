import { isVPMinSm, isVPSm, isVPXs } from '../media-queries';

export const genSnackbarOverrides = (palette, spacing) => ({
  MuiSnackbar: {
    root: {
      userSelect: 'none',
    },

    // accomodate for <BottomNavigation> on sm, xs
    anchorOriginBottomCenter: {
      [isVPSm]: {
        bottom: spacing(10),
      },
      [isVPXs]: {
        bottom: spacing(8),
      },
    },

    // accomodate for <BottomNavigation> on sm, xs
    anchorOriginBottomLeft: {
      [isVPSm]: {
        left: spacing(3),
        bottom: spacing(10),
      },
      [isVPXs]: {
        left: spacing(3),
        right: spacing(3),
        bottom: spacing(8),
      },
    },
  },

  MuiSnackbarContent: {
    root: {
      backgroundColor: palette.background.paper, // otherwise always white
      color: palette.common.text, // otherwise always black

      [isVPMinSm]: {
        minWidth: 300, // 288px* (seemed arbitrary... 🤷‍♀️)
      },
    },
  },
});
