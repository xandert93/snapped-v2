import { Button, CircularProgress, DialogContent, Typography, Grid } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { snapAPI } from '../../api';
import { selectSelectedSnapId } from '../../state';

import { RelationList } from '../../../user/components';
import { useHTTP, useMountEffect, useInfiniteScroll } from '../../../../hooks';
import {
  DialogHeader,
  DialogTitle,
  RetryRequest,
  NoDataText,
  ScrollEndText,
} from '../../../../components';

//*** basically all copied from <ProfileRelationDialog>
export const SnapLikesDialog = () => {
  const snapId = useSelector(selectSelectedSnapId);

  const [hasMore, setHasMore] = useState(false);
  const [users, setUsers] = useState([]);
  const likerCount = users.length;
  const hasUsers = Boolean(likerCount);

  const [isFetching, errMessage, fetchLikers] = useHTTP({
    request: snapAPI.getLikers,
    args: [snapId, likerCount],
    onFetched: (data) => {
      setHasMore(data.hasMore);
      setUsers((prev) => prev.concat(data.users));
    },
  });

  const foundNoUsers = !isFetching && !hasUsers && !errMessage;

  const watchUser = useInfiniteScroll({
    callback: fetchLikers,
    hasMore,
    dependencies: [likerCount],
  });

  useMountEffect(fetchLikers);

  return (
    <>
      <DialogHeader>
        <DialogTitle children="Liked by" />
      </DialogHeader>
      <Grid
        container
        justifyContent="center"
        alignItems={!hasUsers && 'center'}
        component={DialogContent}>
        {hasUsers && (
          <Grid item xs={12}>
            <RelationList users={users} watchUser={watchUser} />
            <Grid container justifyContent="center">
              {!isFetching && !hasMore && <ScrollEndText />}
            </Grid>
          </Grid>
        )}
        {isFetching && <CircularProgress size="2rem" />}
        {errMessage && <RetryRequest message={errMessage} callback={fetchLikers} />}
        {foundNoUsers && <NoDataText children="Be the first to like it!" />}
      </Grid>
    </>
  );
};
