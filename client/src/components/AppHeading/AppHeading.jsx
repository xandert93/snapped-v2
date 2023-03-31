import { Typography } from '@material-ui/core';

import useStyles from './styles';
import clsx from 'clsx';

// props => { className, variant }
export const AppHeading = ({ className, variant, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      className={clsx(className, classes['app-heading'])}
      component="h1"
      variant={variant}
      children="snapped!"
    />
  );
};
