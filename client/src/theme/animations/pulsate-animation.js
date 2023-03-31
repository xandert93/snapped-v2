export const pulsate = (palette, cssProperty) => ({
  '@keyframes pulsate': {
    '0%': {
      [cssProperty]: palette.primary.light,
    },
    '33%': {
      [cssProperty]: palette.success.light,
    },
    '66%': {
      [cssProperty]: palette.warning.light,
    },
    '100%': {
      [cssProperty]: palette.secondary.dark,
    },
  },
});
