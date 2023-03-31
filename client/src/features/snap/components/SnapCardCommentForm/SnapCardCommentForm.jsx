import {
  CardContent,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
} from '@material-ui/core';

import { Create as PenIcon } from '@material-ui/icons';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnap } from '../../context';
import { createSnapComment } from '../../state/snap-actions';

import useStyles from './styles';

// props => { addComment? } (only passed in by <DialogSnap>)
export const SnapCardCommentForm = () => {
  const { _id: snapId, commentCount, commentInputRef } = useSnap();

  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPosting(true);
    try {
      const { comment } = await dispatch(createSnapComment({ snapId, text })).unwrap();
      // addComment?.(comment);
      setText('');
    } finally {
      setIsPosting(false);
    }
  };

  const classes = useStyles();
  return (
    <CardContent className={classes['snap-comment-form']} component="form" onSubmit={handleSubmit}>
      <Input
        className={classes['snap-comment-input']}
        placeholder={!commentCount ? 'Be the first to comment!' : 'Leave a comment...'}
        inputRef={commentInputRef}
        readOnly={isPosting}
        fullWidth
        color={isPosting ? 'primary' : 'secondary'}
        value={text}
        onChange={handleChange}
        endAdornment={
          <InputAdornment className={classes['pen-icon-button']} position="end">
            <IconButton type="submit" color="secondary" disabled={!text || isPosting}>
              {isPosting ? <CircularProgress size={16} /> : <PenIcon fontSize="small" />}
            </IconButton>
          </InputAdornment>
        }
      />
    </CardContent>
  );
};
