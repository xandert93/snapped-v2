import { AppBar } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './styles';

export const GradientAppBar = ({ className, ...props }) => {
  const classes = useStyles();
  return <AppBar className={clsx(className, classes['gradient-app-bar'])} {...props} />;
};
