import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { AvatarSkeleton } from '../../../../components';
import useStyles from './styles';

export const SnapCardSkeleton = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={<AvatarSkeleton />}
        title={<Skeleton width="40%" />}
        subheader={<Skeleton width="60%" />}
      />
      <Skeleton variant="rect" className={classes['skeleton-card-media']} />
      <CardContent component={Grid} container justifyContent="center">
        <HashTagSkeleton />
        <HashTagSkeleton />
        <HashTagSkeleton />
      </CardContent>
      <CardContent component={Grid} container justifyContent="space-around">
        <ActionSkeleton />
        <ActionSkeleton />
      </CardContent>
      <CardContent>
        <Typography align="center">
          <Skeleton height="2.5rem" />
          <Skeleton height="2.5rem" />
        </Typography>
      </CardContent>
    </Card>
  );
};

const HashTagSkeleton = () => {
  return (
    <Typography component={Box} p={0.5}>
      <Skeleton width="5rem" height="2.5rem" style={{ borderRadius: 18 }} />
    </Typography>
  );
};

const ActionSkeleton = () => {
  return <Skeleton variant="rect" height="4rem" width={'40%'} style={{ borderRadius: 4 }} />;
};
