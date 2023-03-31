import { Grid } from '@material-ui/core';
import { SnapCardSkeleton } from '../SnapCardSkeleton';

export const SnapCardSkeletonList = ({ count }) => {
  const arr = Array.from(new Array(count));

  return arr.map((_, index) => (
    <Grid item key={index} xs={12}>
      <SnapCardSkeleton />
    </Grid>
  ));
};
