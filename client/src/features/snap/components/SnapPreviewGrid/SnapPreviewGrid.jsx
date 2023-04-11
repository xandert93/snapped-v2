import {
  Button,
  Fade,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';

import { isVPXs, isVPSm, isVPMinMd } from '../../../../theme/media-queries';

import { useEffect } from 'react';
import { useMediaQueries, useInfiniteScroll } from '../../../../hooks';
import { openSnapDialogById } from '../../../ui/state/ui-actions';
import { useHistory } from 'react-router-dom';

import {
  selectSnapMetadata,
  fetchSnaps,
  clearSnaps,
  selectSnapIds,
  selectSnapById,
} from '../../state';

import { SnapPreviewImageOverlay } from './SnapPreviewImageOverlay';
import { SnapPreviewImage } from '../SnapPreviewImage';
import { ImageListItemSkeletonList, ScrollEndText } from '../../../../components';

const SNAP_LIMIT = 12;

export const SnapPreviewGrid = ({ config, dbCount }) => {
  const dispatch = useDispatch();

  const { isFetching, hasMore, errMessage } = useSelector(selectSnapMetadata);

  const fetch = () => dispatch(fetchSnaps(config));
  const cleanup = () => dispatch(clearSnaps());

  useEffect(() => {
    if (dbCount) fetch();
    return cleanup;
  }, [config.type]);

  const watchSnap = useInfiniteScroll({
    config: { threshold: 1 },
    callback: fetch,
    hasMore,
  });

  const [isXs, isSm] = useMediaQueries(isVPXs, isVPSm);

  const snapIds = useSelector(selectSnapIds);
  const fetchedCount = snapIds.length;
  const hasSnaps = Boolean(fetchedCount);

  const foundNoSnaps = !isFetching && !hasSnaps && !errMessage;

  const skeletonCount = dbCount - fetchedCount > SNAP_LIMIT ? SNAP_LIMIT : dbCount - fetchedCount;

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent={foundNoSnaps && 'center'}
      style={{ flexGrow: 1 }}>
      {!foundNoSnaps && (
        <ImageList
          gap={2} // 4*
          style={{ margin: 0 }} // `gap` adds negative `margin`, which is causing horizontal scroll 🤷‍♀️
          cols={3} // 2*
          rowHeight={isXs ? 150 : isSm ? 250 : 300} // 180*
        >
          {hasSnaps &&
            snapIds.map((id) => (
              <Fade key={id} in timeout={500}>
                <SnapPreviewImageListItem id={id} {...(id === snapIds.at(-1) && { watchSnap })} />
              </Fade>
            ))}
          {isFetching && <ImageListItemSkeletonList count={skeletonCount} />}
        </ImageList>
      )}
      {!isFetching && hasSnaps && !hasMore && <ScrollEndText />}
      {foundNoSnaps && <NoProfileSnaps />}
    </Grid>
  );
};

// *** shouldn't be here, but in something like <ProfileSnapPreviewGrid>
const NoProfileSnaps = () => {
  return (
    <Grid container direction="column" alignItems="center" /* 1 */>
      <Typography variant="body2" color="textSecondary" align="center" paragraph>
        When snaps are shared, they'll be here!
      </Typography>
      {/* <Button variant="outlined">Create snap!</Button> */}
    </Grid>
  );
};

/*
1) couldn't configure `spacing` without getting horizontal scrolling, 
   so I'll manually provide some spacing on children

*/

export const SnapPreviewImageListItem = ({ id, watchSnap, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMinMd = useMediaQuery(isVPMinMd);

  const snap = useSelector(selectSnapById(id));

  const handleClick_original = () => {
    if (isMinMd) dispatch(openSnapDialogById(id)); // IGC concurred
    else history.push(`/snap/${id}`);
  };

  const handleClick = () => {
    dispatch(openSnapDialogById(id));
  };

  const classes = useStyles();
  return (
    <ImageListItem ref={watchSnap} {...props} onClick={handleClick}>
      <SnapPreviewImage snap={snap} />
      <SnapPreviewImageOverlay id={id} />
    </ImageListItem>
  );
};
