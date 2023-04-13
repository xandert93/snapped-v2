import { Typography } from '@material-ui/core';

export const ScrollEndText = (props) => {
  return (
    <Typography
      variant="caption"
      component="p"
      align="center"
      color="textSecondary"
      children="You've reached the end"
      {...props}
    />
  );
};
