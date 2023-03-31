import { Box, CardContent, CardHeader, Grid } from '@material-ui/core';
import { CldAvatar, CldThumb } from '../../../../../components';
import { FollowButton } from '../../FollowButton';
import { ProfileSnapshotActivity } from '../ProfileSnapshotActivity';

import useStyles from './styles';

export const ProfileSnapshot = ({
  _id,
  avatarId,
  username,
  isVerified,
  firstName,
  lastName,
  snapCount,
  followerCount,
  followCount,
  snaps,
  isFollowed,
}) => {
  const fullName = firstName + ' ' + lastName;
  const initials = firstName[0] + lastName[0];

  const classes = useStyles();
  return (
    <Box style={{ pointerEvents: 'auto' }} className={classes['snapshot-container']}>
      <CardHeader
        avatar={<CldAvatar variant="circular" srcId={avatarId} children={initials} />}
        title={username}
        subheader={fullName}
      />
      <CardContent>
        <ProfileSnapshotActivity
          {...{ snapCount, followerCount, followCount, variant: 'subtitle2' }}
        />
      </CardContent>
      <Grid container wrap="nowrap">
        {snaps.map(({ _id, imageId }) => (
          <Grid key={_id} item xs={4}>
            <CldThumb className={classes['snapshot-snap-image']} srcId={imageId} />
          </Grid>
        ))}
      </Grid>
      <CardContent>
        <FollowButton userId={_id} isFollowed={isFollowed} fullWidth stopPropagation />
      </CardContent>
    </Box>
  );
};

// override parent's { pointerEvents: 'none' }, since we want this to remain hover/clickable etc
