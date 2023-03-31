import { useSelector } from 'react-redux';
import { selectAuthUserId } from '../../state/user-selectors';

import { UserPreviewCard } from '../UserPreviewCard';

export const RelationList = ({ users, watchUser }) => {
  const authUserId = useSelector(selectAuthUserId);

  return users.map((user) => (
    <UserPreviewCard
      key={user._id}
      isAuthUser={authUserId === user._id}
      {...user}
      {...(user === users.at(-1) && { watchUser })}
    />
  ));
};
