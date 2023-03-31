import { useSelector } from 'react-redux';

import { selectProfileUserIsFollowed, selectProfileUserId } from '../../../state/user-selectors';
import { FollowButton } from '../../FollowButton';

export const ProfileFollowButton = () => {
  const userId = useSelector(selectProfileUserId);
  const isFollowed = useSelector(selectProfileUserIsFollowed);

  return <FollowButton fullWidth userId={userId} isFollowed={isFollowed} />;
};

/* 1) Since is regular profile user's page, when auth user follows profile user, 
      we want to reflect this in their `followerCount` button
*/
