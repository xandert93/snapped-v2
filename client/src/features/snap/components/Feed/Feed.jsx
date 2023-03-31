import { useSelector } from 'react-redux';

import { selectSnapMetadata } from '../../state';

import { FeedSnapList } from '../FeedSnapList';
import { SnapCardSkeletonList } from '../SnapCardSkeletonList';
import { FeedEnd } from '../FeedEnd';
import { Grid } from '@material-ui/core';

export const Feed = () => {
  const { isFetching, hasMore, errMessage } = useSelector(selectSnapMetadata);

  return (
    <Grid container spacing={2}>
      <FeedSnapList />
      {isFetching && <SnapCardSkeletonList count={3} />}
      {!hasMore && <FeedEnd />}
    </Grid>
  );
};
