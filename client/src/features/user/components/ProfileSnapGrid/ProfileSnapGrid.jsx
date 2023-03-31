import { Route, useRouteMatch } from 'react-router-dom';

import { AuthUserSnapPreviewTabs } from '../AuthUserSnapPreviewTabs';
import { AuthUserSnapGrid } from '../AuthUserSnapGrid';
import { ProfileUserSnapGrid } from '../ProfileUserSnapGrid';

export const ProfileSnapGrid = ({ type, isAuthUser }) => {
  const { path } = useRouteMatch();

  return isAuthUser ? (
    <Route path={path + '/:tab?'}>
      <AuthUserSnapPreviewTabs />
      <AuthUserSnapGrid />
    </Route>
  ) : (
    <ProfileUserSnapGrid />
  );
};
