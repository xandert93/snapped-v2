import { Typography } from '@material-ui/core';

import clsx from 'clsx';
import useStyles from './styles';

export const LoadingText = ({ className, ...props }) => {
  const classes = useStyles();

  return <Typography className={clsx(classes['loading-typography'], className)} {...props} />;
};
