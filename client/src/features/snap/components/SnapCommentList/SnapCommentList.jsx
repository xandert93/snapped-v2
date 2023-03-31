import { Grid, IconButton, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { CldAvatar, DeleteIcon } from '../../../../components';
import { genRelativeDateStr } from '../../../../utils/formatters/date-formatters';
import { ProfileLink } from '../../../user/components';
import { selectDoesAuthUserIdMatch } from '../../../user/state/user-selectors';
import { snapCommentAPI } from '../../api';

import useStyles from './styles';

export const SnapCommentList = ({ comments, watchComment }) => {
  return comments.map((comment) => (
    <SnapComment
      key={comment._id}
      {...comment}
      {...(comment === comments.at(-1) && { watchComment })}
    />
  ));
};

const SnapComment = ({ _id: commentId, author, text, createdAt, watchComment }) => {
  const isUsersComment = useSelector(selectDoesAuthUserIdMatch(author._id));

  const classes = useStyles();
  return (
    <Grid
      component="article"
      className={classes['comment']}
      item
      container
      ref={watchComment}
      wrap="nowrap"
      spacing={1}>
      <Grid item>
        <CldAvatar className={classes['comment-avatar']} srcId={author.avatarId} />
      </Grid>
      <Grid item>
        <Typography variant="body2">
          <ProfileLink id={author._id} username={author.username} children={author.username} />{' '}
          {text}
        </Typography>
        <Typography variant="caption" component="p" color="textSecondary">
          {genRelativeDateStr(new Date(createdAt))}
          {isUsersComment && <DeleteCommentButton commentId={commentId} />}
        </Typography>
      </Grid>
    </Grid>
  );
};

const DeleteCommentButton = ({ commentId }) => {
  const handleDeleteClick = async () => {
    await snapCommentAPI.remove({ commentId });
    // await dispatch(deleteSnapComment({ snapId, commentId })).unwrap();
  };

  const classes = useStyles();
  return (
    <IconButton
      className={classes['delete-comment-button']}
      onClick={handleDeleteClick}
      size="small"
      children={<DeleteIcon fontSize="inherit" color="disabled" />}
    />
  );
};
