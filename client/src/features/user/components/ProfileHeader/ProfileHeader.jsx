import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { useSetDocumentTitle } from '../../../../hooks';

import { ProfileFollowButton } from './ProfileFollowButton';
import { ProfileHeaderActivity } from './ProfileHeaderActivity';

import useStyles from './styles';
import { selectUser, selectUserUsername } from '../../state/user-selectors';

import { DIALOGS } from '../../../../constants/modal-constants';

import {
  RoundedButton,
  UpdateIcon,
  MessengerIcon,
  Tooltip,
  IconButton,
} from '../../../../components';

import { openDialog } from '../../../ui/state/ui-slice';
import { ProfileHeaderData } from './ProfileHeaderData';

import { ProfileHeaderAvatar } from './ProfileHeaderAvatar';

export const ProfileHeader = ({ type, isAuthProfile }) => {
  const username = useSelector(selectUserUsername(type));
  useSetDocumentTitle(username);

  const { snapCount, followCount, followerCount, avatarId, firstName, lastName, profile } =
    useSelector(selectUser(type));

  return (
    <>
      <Grid item container alignItems="center">
        <Grid item xs={2}>
          <ProfileHeaderAvatar type={type} isAuth={isAuthProfile} />
        </Grid>
        <Grid item xs={10}>
          <ProfileHeaderActivity {...{ snapCount, followerCount, followCount, type }} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography component="h2" style={{ fontWeight: 'bold' }}>
          {firstName} {lastName}
        </Typography>
        <Typography component="span" color="textSecondary">
          @{username}
        </Typography>
        {isAuthProfile && <UpdateProfileButton />}
      </Grid>

      <Grid item>
        <ProfileHeaderData data={profile} />
      </Grid>
      {!isAuthProfile && (
        <Grid
          item
          xs={9}
          sm={8}
          md={7}
          container
          wrap="nowrap"
          spacing={1}
          style={{ alignSelf: 'center' }}>
          <Grid item xs={12}>
            <ProfileFollowButton />
          </Grid>
          <Grid item xs={12}>
            <ProfileMessageButton />
          </Grid>
        </Grid>
      )}
    </>
  );
};

const ProfileMessageButton = () => {
  return (
    <RoundedButton
      fullWidth
      variant="contained"
      size="small"
      endIcon={<MessengerIcon />}
      children="Message"
    />
  );
};

const UpdateProfileButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(openDialog(DIALOGS.PROFILE_UPDATE));

  return (
    <Tooltip title="Update profile" placement="right">
      <IconButton
        size="small"
        color="primary"
        onClick={handleClick}
        style={{ verticalAlign: -2, marginLeft: 8 }}>
        <UpdateIcon />
      </IconButton>
    </Tooltip>
  );
};
