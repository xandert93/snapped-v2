import { IconButton as MuiIconButton } from '@material-ui/core';
import { forwardRef } from 'react';

import clsx from 'clsx';

import useStyles from './styles';

// has extra (and responsive) padding applied
// has almost transparent background color applied, with slight opacity increase on hover

export const IconButton = forwardRef(({ className, ...props }, ref) => {
  const classes = useStyles();

  return (
    <MuiIconButton
      ref={ref} // 1
      className={clsx(className, classes['icon-button'])}
      {...props}
    />
  );
});

/*
1) <Tooltip> expects to pass a ref to it

*/
