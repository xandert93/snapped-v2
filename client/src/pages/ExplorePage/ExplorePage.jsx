import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useHTTP, useSetDocumentTitle } from '../../hooks';
import { SnapPreviewGrid } from '../../features/snap/components';
import { numOf } from '../../utils/formatters/string-formatters';
import { Box, Typography } from '@material-ui/core';
import { snapAPI } from '../../features/snap/api';
import { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Main, NoDataText } from '../../components';

export const ExplorePage = () => {
  useSetDocumentTitle('Explore');

  const { path } = useRouteMatch();

  return (
    <Main maxWidth="md" disableGutters>
      <Switch>
        <Route exact path={path} component={GeneralExplore} />
        <Route path={path + '/tags/:tags'} component={TagsExplore} />
      </Switch>
    </Main>
  );
};

// /tags/:tags

const GeneralExplore = () => {
  return <h2>Coming soon lol</h2>;
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
        <SnapPreviewGrid config={{ type: 'explore', tagsStr }} dbCount={count} />
      )}
    </>
  );
};

const TagsExploreTitle = (props) => {
  const { tags: tagsStr } = useParams();

  const title = tagsStr.split(',').join(', #');

  return (
    <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }} {...props}>
      Explore #{title}
    </Typography>
  );
};

/*
1) when tagStr changes in URL, refetch count. This unmounts previous <SnapPreviewGrid> 
   (automatic cleanup of prev snaps!) and then remounts once count is fetched.

*/
