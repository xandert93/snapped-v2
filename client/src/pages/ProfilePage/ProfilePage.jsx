import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, useRouteMatch } from 'react-router-dom';

import {
  AuthUserSnapGrid,
  ProfileHeader,
  AuthUserSnapPreviewTabs,
  ProfileUserSnapGrid,
  ProfileUserSnapPreviewTabs,
} from '../../features/user/components';
import { selectIsAuthUsersUsername } from '../../features/user/state/user-selectors';
import { fetchProfileUser } from '../../features/user/state/user-actions';
import { Main, NotFound } from '../../components';

import { ProfileHeaderSkeleton, ProfileHeaderContainer } from '../../features/user/components';
import { CircularProgress, Grid } from '@material-ui/core';

export const ProfilePage = () => {
  const { username } = useParams();

  const isAuthUsersUsername = useSelector(selectIsAuthUsersUsername(username));
  const profileType = isAuthUsersUsername ? 'auth' : 'profile';

  return <Profile key={username} isAuthProfile={isAuthUsersUsername} type={profileType} />;
};

const Profile = ({ isAuthProfile, type }) => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { path } = useRouteMatch();

  const [isFetching, setIsFetching] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [hasErr, setHasErr] = useState(false);

  useEffect(() => {
    if (isAuthProfile) {
      setIsFetching(false);
      setIsFetched(true);
    } // 1
    else {
      (async () => {
        try {
          await dispatch(fetchProfileUser(username)).unwrap();
          setIsFetched(true);
        } catch (err) {
          setHasErr(true);
        } finally {
          setIsFetching(false);
        }
      })();
    }
  }, []);

  if (hasErr) return <NotFound />;
  return (
    <Grid container direction="column" wrap="nowrap" component={Main} maxWidth="md" disableGutters>
      {isFetching ? (
        <Grid container justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
          <CircularProgress size="2rem" />
        </Grid>
      ) : (
        <ProfileHeaderContainer>
          <ProfileHeader type={type} isAuthProfile={isAuthProfile} />
        </ProfileHeaderContainer>
      )}

      {isFetched && isAuthProfile && (
        <Route path={path + '/:tab?'}>
          <AuthUserSnapPreviewTabs />
          <AuthUserSnapGrid />
        </Route>
      )}
      {isFetched && !isAuthProfile && (
        <>
          <ProfileUserSnapPreviewTabs />
          <ProfileUserSnapGrid />
        </>
      )}
    </Grid>
  );
};

/* 1) if metadata state of `isFetching` and `hasErr` is in Redux store, we should do:
      
      useEffect(() => {
        if (isAuthProfile) dispatch(fetchProfileUser.fulfilled()) // sets `isFetching` to false
        else dispatch(fetchProfileUser(username))
      }, [])


*/
