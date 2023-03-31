import { IconButton as MuiIconButton, Typography } from '@material-ui/core';

import useStyles from './styles';

//props include "onClick" || "disabled" || "edge" etc.

export const ResponsiveIconButton = ({ size, Icon, ...props }) => {
  const classes = useStyles();
  return (
    <MuiIconButton {...props}>
      <Typography variant={size} component={Icon} />
    </MuiIconButton>
  );
};
