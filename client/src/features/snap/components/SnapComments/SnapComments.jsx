import { useEffect, useState } from 'react';
import { useSnap } from '../../context';

import { useInfiniteScroll, useHTTP } from '../../../../hooks';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { snapCommentAPI } from '../../api';

import { ScrollEndText, RetryRequest, NoDataText } from '../../../../components';
import { SnapCommentList } from '../SnapCommentList';

import useStyles from './styles';

export const SnapComments = ({ comments, setComments }) => {
  const { _id: snapId, commentCount: dbCommentCount } = useSnap();

  const [hasMore, setHasMore] = useState(false);

  const commentCount = comments.length;
  const hasComments = Boolean(commentCount);

  const [isFetching, errMessage, fetchComments] = useHTTP({
    request: snapCommentAPI.get,
    args: [snapId, commentCount],
    onFetched: (data) => {
      const { comments: fetchedComments, hasMore } = data;

      setComments((prev) => prev.concat(fetchedComments));
      setHasMore(hasMore);
    },
  });

  useEffect(() => {
    if (!dbCommentCount) return;
    else fetchComments();
  }, []);

  const watchComment = useInfiniteScroll({
    config: { threshold: 0.8 },
    callback: fetchComments,
    hasMore,
    dependencies: [commentCount],
  });

  const foundNoComments = !isFetching && !hasComments && !errMessage;

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent={!hasComments ? 'center' : 'flex-start'}
      spacing={2}
      className={classes['snap-comments-container']}
      component={Box}
      p={1}>
      {hasComments && (
        <>
          <SnapCommentList {...{ comments, watchComment }} />
          {!isFetching && !hasMore && (
            <Grid item>
              <ScrollEndText />
            </Grid>
          )}
        </>
      )}
      {isFetching && (
        <Grid item>
          <CircularProgress size="2rem" />
        </Grid>
      )}
      {foundNoComments && <NoDataText children="Be the first to comment!" />}
      {errMessage && <RetryRequest message={errMessage} callback={fetchComments} />}
    </Grid>
  );
};
