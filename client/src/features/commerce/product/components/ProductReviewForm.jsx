import { CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInput } from '../../../../hooks';
import { createProductReview } from '../state/product-review/product-review-actions';
import { selectIsReviewPosting } from '../state/product-review/product-review-selectors';

export const ProductReviewForm = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [rating, handleRatingChange] = useInput();
  const [text, handleTextChange] = useInput();

  const isPosting = useSelector(selectIsReviewPosting);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProductReview({ productId, review: { rating: Number(rating), text } }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>You have bought this. Leave a review:</p>
      <div>
        <Rating name="rating" value={+rating} onChange={handleRatingChange} />
      </div>
      <div>
        <textarea
          name="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Your review..."
        />
      </div>
      <button disabled={!text || !rating || isPosting}>
        {isPosting ? <CircularProgress /> : 'Post Review'}
      </button>
    </form>
  );
};
