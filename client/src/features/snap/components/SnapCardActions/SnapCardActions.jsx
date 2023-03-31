import { Box, CardActions, CardContent, IconButton, Typography, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { numOf } from '../../../../utils/formatters/string-formatters';
import { FlameIcon, CommentIcon } from '../../../../components';
import { openSnapDialogById, openSnapLikesDialog } from '../../../ui/state/ui-actions';
import { useSnap } from '../../context';

import useStyles from './styles';

export const SnapCardActions = () => {
  const { _id, toggleLike, isLiked, likeCount, commentCount, commentInputRef } = useSnap();
  const dispatch = useDispatch();

  const handleCommentIconClick = () => commentInputRef.current.focus();

  const handleLikeCountClick = () => {
    if (!likeCount) return;
    dispatch(openSnapLikesDialog(_id));
  };

  const handleCommentCountClick = () => {
    if (!commentCount) return;
    dispatch(openSnapDialogById(_id));
  };

  const classes = useStyles({ isLiked });
  return (
    <CardContent>
      <CardActions className={classes['card-actions']}>
        <Box className={'like-action'}>
          <SnapLikeButton onClick={toggleLike} isLiked={isLiked} />
          <CounterText type="like" onClick={handleLikeCountClick} count={likeCount} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className={'comment-action'}>
          <SnapCommentButton onClick={handleCommentIconClick} />
          <CounterText type="comment" onClick={handleCommentCountClick} count={commentCount} />
        </Box>
      </CardActions>
    </CardContent>
  );
};

const SnapLikeButton = (props) => {
  const classes = useStyles({ isLiked: props.isLiked });
  return (
    <IconButton onClick={props.onClick}>
      <FlameIcon className={classes['flame-icon']} />
    </IconButton>
  );
};

const SnapCommentButton = (props) => {
  const classes = useStyles();
  return (
    <IconButton onClick={props.onClick} disableRipple>
      <CommentIcon color="primary" className={classes['comment-icon']} />
    </IconButton>
  );
};

const CounterText = (props) => {
  return (
    <Typography
      component="p"
      variant="caption"
      color={props.count ? 'textPrimary' : 'textSecondary'}
      onClick={props.onClick}
      children={numOf(props.count, props.type)}
    />
  );
};
