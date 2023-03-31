import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteScroll } from '../../../../hooks';
import { fetchSnaps, selectHasMoreSnaps, clearSnaps, selectSnapIds } from '../../state';
import { FeedSnapCard } from '../FeedSnapCard';

import useStyles from './styles';

export const FeedSnapList = () => {
  const dispatch = useDispatch();
  const snapIds = useSelector(selectSnapIds);
  const hasMore = useSelector(selectHasMoreSnaps);

  const fetch = () => dispatch(fetchSnaps({ type: 'feed' }));
  const cleanup = () => dispatch(clearSnaps());

  useEffect(() => {
    fetch();
    return cleanup;
  }, []);

  const watchSnap = useInfiniteScroll({ callback: fetch, hasMore });

  return snapIds.map((id) => (
    <Grid key={id} item xs={12}>
      <FeedSnapCard id={id} {...(id === snapIds.at(-1) && { watchSnap })} />
    </Grid>
  ));
};

/* have opted against <Masonry>, because <Skeleton>s will be harder to do for different 
breakpoints. <CircularProgress> may be more appropriate when scrolling too.

Masonry code: 

  const classes = useStyles();
  return (
    <Masonry
      className={classes['masonry-container']}
      columnClassName={classes['masonry-column']}
      breakpointCols={{ default: 3, 1500: 2, 900: 1 }} // could also get `useTheme().breakpoints.values`
    >
      {snapIds.map((id) => (
        <FeedSnapCard id={id} {...(id === snapIds.at(-1) && { watchSnap })} />
      ))}
    </Masonry>
  );
*/
