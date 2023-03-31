import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import {
  selectAuthUserAvatarId,
  selectAuthUserInitials,
  selectAuthUserUsername,
} from '../../state/user-selectors';
import { CldAvatar } from '../../../../components';

import clsx from 'clsx';
import useStyles from './styles';

export const AuthUserAvatar = forwardRef(
  ({ className, fontSize, border, hover, ...props }, ref) => {
    const avatarId = useSelector(selectAuthUserAvatarId);
    const username = useSelector(selectAuthUserUsername);
    const initials = useSelector(selectAuthUserInitials);

    const classes = useStyles({ fontSize, border, hover }); // 1

    return (
      <CldAvatar
        ref={ref} // 2
        srcId={avatarId}
        className={clsx(className, classes['auth-user-avatar'])}
        alt={`${username}'s profile picture`}
        children={initials}
        {...props}
      />
    );
  }
);

/*
1) width and height will each be 2x passed fontSize

2) <Tooltip> expects to pass a ref to it, and passes general props too
*/
