import { Typography } from '@material-ui/core';

export const Icon = ({ variant, component, ...props }) => {
  return <Typography variant={variant} component={component} {...props} />; // 1
};

// in overrides, on MuiSvgIcon-root, I've set { fontSize: undefined }, otherwise this won't work
