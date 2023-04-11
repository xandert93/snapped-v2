import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useHTTP, useMediaQueries, useSetDocumentTitle } from '../../hooks';
import { SnapPreviewGrid } from '../../features/snap/components';
import { numOf } from '../../utils/formatters/string-formatters';
import { Box, Fade, Grid, ImageList, Typography } from '@material-ui/core';
import { snapAPI } from '../../features/snap/api';
import { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { ImageListItemSkeletonList, Main, NoDataText } from '../../components';
import { SnapPreviewImageListItem } from '../../features/snap/components/SnapPreviewGrid/SnapPreviewGrid';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSnaps,
  fetchSnaps,
  selectSnapIds,
  selectSnapMetadata,
} from '../../features/snap/state';
import { isVPSm, isVPXs } from '../../theme/media-queries';

export const ExplorePage = () => {
  useSetDocumentTitle('Explore');

  const { path } = useRouteMatch();

  return (
    <Main maxWidth="md" disableGutters style={{ paddingTop: 0 }}>
      <Switch>
        <Route exact path={path} component={Explore} />
        <Route path={path + '/tags/:tags'} component={TagsExplore} />
      </Switch>
    </Main>
  );
};

// /tags/:tags

const Explore = () => {
  const dispatch = useDispatch();

  const { isFetching } = useSelector(selectSnapMetadata);

  const fetch = () => dispatch(fetchSnaps({ type: 'explore' }));
  const cleanup = () => dispatch(clearSnaps());

  useEffect(() => {
    fetch();
    return cleanup;
  }, []);

  const snapIds = useSelector(selectSnapIds);
  const hasSnaps = Boolean(snapIds.length);

  const [isXs, isSm] = useMediaQueries(isVPXs, isVPSm);

  //*** all copied from <SnapPreviewGrid>...requires refactoring - SnapPreviewGrid should probably just read snaps rather than IDs from Redux
  return (
    <Grid container direction="column" style={{ flexGrow: 1 }}>
      <ImageList
        gap={2} // 4*
        style={{ margin: 0 }} // `gap` adds negative `margin`, which is causing horizontal scroll 🤷‍♀️
        cols={3} // 2*
        rowHeight={isXs ? 150 : isSm ? 250 : 300} // 180*
      >
        {hasSnaps &&
          snapIds.map((id) => (
            <Fade key={id} in timeout={500}>
              <SnapPreviewImageListItem id={id} />
            </Fade>
          ))}
        {isFetching && <ImageListItemSkeletonList count={18} />}
      </ImageList>
    </Grid>
  );
};

const TagsExplore = () => {
  const { tags: tagsStr } = useParams();

  const [count, setCount] = useState(0);
  const hasSnaps = Boolean(count);

  const [isFetching, errMessage, fetchCount] = useHTTP({
    request: snapAPI.getByHashtagsCount,
    args: [tagsStr],
    onFetched: ({ count }) => setCount(count),
  });

  useEffect(fetchCount, [tagsStr]); // 1

  const foundNoSnaps = !isFetching && !hasSnaps && !errMessage;

  return (
    <>
      <Box p={2}>
        <TagsExploreTitle gutterBottom />
        <Typography gutterBottom>
          {isFetching ? <Skeleton width="8em" /> : `We found ${numOf(count, 'snap')}!`}
        </Typography>
        {foundNoSnaps && <NoDataText children="Try another hashtag!" />}
      </Box>
      {!isFetching && hasSnaps && (
        <SnapPreviewGrid config={{ type: 'explore-tags', tagsStr }} dbCount={count} />
      )}
    </>
  );
};

const TagsExploreTitle = (props) => {
  const { tags: tagsStr } = useParams();

  const title = tagsStr.split(',').join(', #');

  return (
    <Typography variant="h5" component="h2" {...props}>
      Explore #{title}
    </Typography>
  );
};

/*
1) when tagStr changes in URL, refetch count. This unmounts previous <SnapPreviewGrid> 
   (automatic cleanup of prev snaps!) and then remounts once count is fetched.

*/
