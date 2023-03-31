import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { forwardRef } from 'react';
import useStyles from './styles';

export const RoundedButton = forwardRef(({ className, ...props }, ref) => {
  const classes = useStyles();

  return (
    <Button
      ref={ref} // 1
      className={clsx(className, classes['rounded-button'])}
      {...props}
    />
  );
});

/*
1) Transition component wants it to hold a ref

*/
