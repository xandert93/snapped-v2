import { CardContent, Divider, useMediaQuery } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isVPMaxSm } from '../../../../theme/media-queries';

import { SnapCardProvider } from '../../context';
import { selectSelectedSnap } from '../../state';

import { SnapCardCaption } from '../SnapCardCaption';
import { SnapCardFooter } from '../SnapCardFooter';
import { SnapCardHeader } from '../SnapCardHeader';
import { SnapCardTags } from '../SnapCardTags';
import { SnapComments } from '../SnapComments';
import { SnapDialogMedia } from '../SnapDialogMedia';

import useStyles from './styles';

export const SnapDialogCard = () => {
  const snap = useSelector(selectSelectedSnap);

  const [comments, setComments] = useState([]);

  const isMaxSm = useMediaQuery(isVPMaxSm);

  const classes = useStyles();
  return (
    <SnapCardProvider snap={snap}>
      <SnapCardHeader />
      <Divider />
      {isMaxSm && <SnapDialogMedia />}
      <CardContent className={classes['dialog-snap-card-content']}>
        <SnapCardCaption />
        <SnapCardTags />
        <SnapComments comments={comments} setComments={setComments} />
      </CardContent>

      {/* <SnapCardActions />
          <SnapCardCommentForm addComment={addComment} /> 
      */}

      <Divider />
      <SnapCardFooter />
    </SnapCardProvider>
  );
};

/*
 `comments` state is temporarily lifted here because if I wanted an `addComment`
 function (see below), it would need to be passed into <SnapCardCommentForm>.

   const addComment = (comment) => setComments((prev) => [comment, ...prev]);
   
   const removeComment = (commentId) => {
     setComments((prev) => prev.filter((comment) => comment._id !== commentId));
   };

  `removeComment` works, but had to drill 7-8 times (!) to get it into the
  <CommentDeleteButton>. If I use this local state approach, I should
  probably have "snapCommentContext" for this. But hopefully is achievable with Redux

*/
