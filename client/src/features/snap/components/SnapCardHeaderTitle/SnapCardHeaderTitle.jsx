import { ProfileLink } from '../../../user/components';

import { useSnap } from '../../context';

export const SnapCardHeaderTitle = () => {
  const { _id: creatorId, username } = useSnap().creator;

  return <ProfileLink id={creatorId} username={username} children={username} />;
};
