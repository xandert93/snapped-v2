import { Chip, Typography } from '@material-ui/core';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { GradientButton } from '../../../../../components';

import { AuthUserAvatar } from '../../../../user/components';
import { selectAuthUserFirstName } from '../../../../user/state/user-selectors';

import clsx from 'clsx';

import useStyles from './styles';

export const ProfileChip = forwardRef(({ className, ...props }, ref) => {
  const firstName = useSelector(selectAuthUserFirstName);

  const classes = useStyles();
  return (
    <Chip
      ref={ref} // 1
      className={clsx(className, classes['profile-chip'])}
      avatar={<ProfileChipAvatar />} // 2
      label={<Typography children={firstName} />}
      component={GradientButton}
      clickable
      {...props}
    />
  );
});

const ProfileChipAvatar = () => {
  const classes = useStyles();
  return <AuthUserAvatar fontSize={22} className={classes['profile-chip-avatar']} />;
};

/*
1) <Tooltip> expects to pass a ref to it, and passes general props too

2) `avatar` prop passes an undesirable (for this use case) 'MuiChipAvatar-root' class name. 
    It's very specific, making its rules hard to overwrite. As such, in <ProfileChipAvatar>, 
    I'm not accepting it.  
*/
