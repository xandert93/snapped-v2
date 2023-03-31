const defaultValues = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const breakpoints = {
  values: {
    xs: 0, // 'xs' key now means anything in the range of 0 - 576px and so forth
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    ...defaultValues,
  },
};
