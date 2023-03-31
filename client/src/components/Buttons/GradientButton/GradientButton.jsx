import { forwardRef } from 'react';
import { Button } from '@material-ui/core';

import clsx from 'clsx';

import useStyles from './styles';

export const GradientButton = forwardRef(({ className, color1, color2, ...props }, ref) => {
  const classes = useStyles({ color1, color2 });

  return <Button ref={ref} className={clsx(className, classes['gradient-button'])} {...props} />;
});
