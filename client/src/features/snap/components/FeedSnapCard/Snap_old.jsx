import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SnapCardProvider } from './snapCardContext';

import { Card } from '@material-ui/core';

import { SnapCardHeader } from './SnapCardHeader';
import { SnapCardMedia } from './SnapCardMedia';
import { SnapCardTags } from './SnapCardTags';
import { SnapCardActions } from './SnapCardActions';
import { SnapCardCaption } from './SnapCardCaption';
import { SnapCardCommentForm } from './SnapCardCommentForm';
import { SnapCardFooter } from './SnapCardFooter';

import useStyles from './styles';

import { selectSnapIsLiked, selectSnapLikeCount } from '../../state';

import { toggleSnapLike } from '../../state';

export const FeedSnapCard = ({ id, watchSnap }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialIsLiked = useSelector(selectSnapIsLiked(id));
  const initialLikeCount = useSelector(selectSnapLikeCount(id));

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const toggleLike = useCallback(async () => {
    const wasLiked = !isLiked;

    setIsLiked((prev) => !prev);
    setLikeCount((prev) => prev + (wasLiked ? 1 : -1));

    try {
      await dispatch(toggleSnapLike({ id, wasLiked })).unwrap(); // 1
    } catch {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => prev + (wasLiked ? -1 : +1));
    }
  }, [isLiked, likeCount]);

  const commentInputRef = useRef();

  const contextValue = {
    id,
    isLiked,
    likeCount,
    toggleLike,
    commentInputRef,
  };

  return (
    <SnapCardProvider value={contextValue}>
      <Card className={classes['snap-card']} raised>
        <SnapCardHeader />
        <SnapCardMedia />
        <SnapCardTags />
        <SnapCardActions />
        <SnapCardCaption />
        <SnapCardCommentForm />
        <SnapCardFooter watchSnap={watchSnap} />
      </Card>
    </SnapCardProvider>
  );
};

/*
1) dispatching it via Redux ensures that error <Snackbar> opens via middleware
*/
