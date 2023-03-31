import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { ProfileAvatar } from '../ProfileAvatar';

export const ProfileHeaderSkeleton = () => {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Skeleton variant="circle">
            <ProfileAvatar />
          </Skeleton>
        </Grid>
        <Grid item xs={10}>
          <Grid container justifyContent="space-around">
            <Grid item xs={2} container direction="column">
              <Typography>
                <Skeleton />
              </Typography>
              <Typography>
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={2} container direction="column">
              <Typography>
                <Skeleton />
              </Typography>
              <Typography>
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={2} container direction="column">
              <Typography>
                <Skeleton />
              </Typography>
              <Typography>
                <Skeleton />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>
          <Skeleton width="8em" />
        </Typography>
        <Typography>
          <Skeleton width="8em" />
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption">
          <Skeleton width="12em" />
        </Typography>
        <Typography variant="caption">
          <Skeleton width="12em" />
        </Typography>
        <Typography variant="caption">
          <Skeleton width="12em" />
        </Typography>
      </Grid>
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
          <Skeleton variant="rect" height="2em" style={{ borderRadius: 20 }} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rect" height="2em" style={{ borderRadius: 20 }} />
        </Grid>
      </Grid>
    </>
  );
};
