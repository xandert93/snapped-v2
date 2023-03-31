export const genLinkOverrides = (palette) => ({
  MuiLink: {
    root: {
      '&:hover': {
        color: palette.secondary.light,
      },
    },

    button: {
      verticalAlign: 'initial', // 'middle'* [out of place vertically]
    },
  },
});
