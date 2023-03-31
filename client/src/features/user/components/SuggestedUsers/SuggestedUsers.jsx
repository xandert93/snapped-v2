import { useState } from 'react';
import { userAPI } from '../../api';

import { useHTTP, useMountEffect } from '../../../../hooks';

import { SuggestedUserListSkeleton } from './SuggestedUserListSkeleton';
import { SuggestedUserList } from './SuggestedUserList';

export const SuggestedUsers = ({ count }) => {
  const [users, setUsers] = useState([]);

  const [isFetching, errMessage, fetchUsers] = useHTTP({
    request: userAPI.getSuggested,
    args: [count],
    onFetched: ({ users }) => setUsers(users),
  });

  useMountEffect(fetchUsers);

  if (isFetching) return <SuggestedUserListSkeleton count={count} />;
  else return <SuggestedUserList users={users} />;
};
