import { Box, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { CldAvatar } from '../../../../components';

import { genRelativeDateStr } from '../../../../utils/formatters/date-formatters';
import { selectDoesAuthUserIdMatch } from '../../../user/state/user-selectors';
import { deleteProductReview } from '../state/product-review/product-review-actions';
import { selectProductReviewById } from '../state/product-review/product-review-selectors';

export const ProductReview = ({ id }) => {
  const dispatch = useDispatch();

  const {
    rating,
    text,
    updatedAt,
    reviewer: { _id: reviewerId, username, avatarId },
  } = useSelector(selectProductReviewById(id));

  const isUsersReview = useSelector(selectDoesAuthUserIdMatch(reviewerId));

  const handleDeleteClick = () => dispatch(deleteProductReview({ id, rating }));

  const handleEditClick = () => () => {};

  return (
    <Box m={1} style={{ border: '2px red solid' }}>
      <p>
        <CldAvatar srcId={avatarId} alt={username} />
        {username} {genRelativeDateStr(new Date(updatedAt))}
      </p>
      <Rating name="rating" value={rating} size="small" readOnly />
      <p>{text}</p>
      {isUsersReview && (
        <>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={handleDeleteClick}>Delete</Button>
        </>
      )}
    </Box>
  );
};
