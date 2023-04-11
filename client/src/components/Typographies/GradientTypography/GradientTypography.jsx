import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './styles';

export const GradientTypography = ({ className, color1, color2, degs, ...props }) => {
  const classes = useStyles({ color1, color2, degs });

  return <Typography className={clsx(className, classes['gradient-typography'])} {...props} />;
};
