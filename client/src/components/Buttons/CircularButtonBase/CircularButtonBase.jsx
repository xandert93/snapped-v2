import { forwardRef } from 'react';
import useStyles from './styles';

import clsx from 'clsx';
import { ButtonBase } from '@material-ui/core';

export const CircularButtonBase = forwardRef(({ className, ...props }, ref) => {
  const classes = useStyles();

  return (
    <ButtonBase className={clsx(className, classes['circular-button-base'])} ref={ref} {...props} />
  );
});
