import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { SnapPreviewGrid } from '../../../snap/components';
import { selectAuthUserId, selectAuthUserSnapCount } from '../../state/user-selectors';

const getSnapType = (tab) => {
  switch (tab) {
    case 'private':
      return 'auth-private';
    default:
      return 'auth';
  }
};

export const AuthUserSnapGrid = (props) => {
  const { tab } = useParams();
  const type = getSnapType(tab); // 1

  const userId = useSelector(selectAuthUserId);
  const dbCount = useSelector(selectAuthUserSnapCount);

  return <SnapPreviewGrid config={{ type, userId }} dbCount={dbCount} />;
};

/*
1) I could use simple if statement, but function allows me to create more sub-pages in the future e.g. 'tagged'
*/
