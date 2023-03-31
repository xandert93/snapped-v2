export const genProgressOverrides = (palette) => ({
  MuiCircularProgress: {
    colorPrimary: {
      color: palette.warning.main,
    },
  },
  MuiLinearProgress: {
    barColorPrimary: {
      backgroundColor: palette.warning.main,
    },
    barColorSecondary: {
      backgroundColor: palette.success.main,
    },
  },
});
