import { useSelector } from 'react-redux';
import { SnapPreviewGrid } from '../../../snap/components';

import { selectProfileUserId, selectUserSnapCount } from '../../state/user-selectors';

export const ProfileUserSnapGrid = () => {
  const userId = useSelector(selectProfileUserId);
  const snapCount = useSelector(selectUserSnapCount('profile'));

  return <SnapPreviewGrid config={{ type: 'profile', userId }} dbCount={snapCount} />;
};
