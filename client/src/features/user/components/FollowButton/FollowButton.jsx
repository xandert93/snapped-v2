import { CircularProgress } from '@material-ui/core';

import { useState } from 'react';

import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { toggleFollow } from '../../state/user-actions';

import { RoundedButton } from '../../../../components';

const follow = { children: 'Follow' };
const following = { color: 'secondary', children: 'Following' };
const unfollow = { color: 'primary', children: 'Unfollow' };
const loading = { disabled: true, children: <CircularProgress size={26} style={{ padding: 3 }} /> };

// props => { userId, isFollowed, stopPropagation?, fullWidth? }
export const FollowButton = ({ userId, isFollowed, stopPropagation, ...props }) => {
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(isFollowed);
  const [buttonProps, setButtonProps] = useState(isFollowed ? following : follow);

  const handleClick = async (e) => {
    if (stopPropagation) e.stopPropagation(); // 1

    setButtonProps(loading);

    const wasFollowed = !isFollowing;
    const incValue = wasFollowed ? +1 : -1;

    try {
      await dispatch(toggleFollow({ userId, wasFollowed, incValue })).unwrap();
      setIsFollowing(wasFollowed);
      setButtonProps(wasFollowed ? following : follow);
    } catch (err) {
      setButtonProps(wasFollowed ? follow : following);
    }
  };

  const handleMouseEnter = (e) => {
    isFollowing && setButtonProps(unfollow);
  };

  const handleMouseLeave = (e) => {
    if (buttonProps === loading) return; // 1
    isFollowing && setButtonProps(following);
  };

  const classes = useStyles();
  return (
    <RoundedButton
      className={classes['follow-button']}
      variant="contained"
      size="small"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...buttonProps}
      {...props}
    />
  );
};

/*
  1) sometimes <FollowButton> is child of <UserPreviewCard> or <ProfileSnapshotPopover>
  (which both have their own `onClick`).
  Thus, to prevent these from firing, we stop propagation if a `stopPropagation` 
  prop was passed.

  The mouseenter and mouseleave event handlers are only for use when the auth user is following the profile user.
  If the profile user is not followed, they will do nothing and simply display a "follow" button.

  2) Whenever cursor has entered button, clicks it (making it become disabled), `handleMouseleave` runs as a result.
     Without this check, if the auth user is following the profile user, the `buttonProps` will immediately toggle 
     back to `following` and won't display the `loading` props as desired.

*/
