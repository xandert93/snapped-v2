import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles';

export const ProfileSnapshotActivity = ({ snapCount, followerCount, followCount }) => {
  const activityData = {
    snaps: snapCount,
    followers: followerCount,
    following: followCount,
  };

  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      {Object.entries(activityData).map(([title, value]) => (
        <Grid key={title} item xs={4} container spacing={1} direction="column" alignItems="center">
          <Typography variant="subtitle2" className={classes['activity-count']} children={value} />
          <Typography variant="subtitle2" children={title} />
        </Grid>
      ))}
    </Grid>
  );
};
