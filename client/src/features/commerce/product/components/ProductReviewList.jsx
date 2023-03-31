import { CircularProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductReviews } from '../state/product-review/product-review-actions';

import {
  selectAreReviewsFetching,
  selectProductReviewIds,
  selectReviewPageCount,
} from '../state/product-review/product-review-selectors';

import { ProductReview } from './ProductReview';

export const ProductReviewList = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [pageNum, setPageNum] = useState(1);

  const isFetching = useSelector(selectAreReviewsFetching);
  const reviewIds = useSelector(selectProductReviewIds);
  const pageCount = useSelector(selectReviewPageCount);

  useEffect(() => dispatch(fetchProductReviews({ productId, pageNum })), [pageNum]);

  return isFetching ? (
    <CircularProgress />
  ) : (
    <>
      <h3>Reviews:</h3>
      {pageCount > 1 && (
        <Pagination page={pageNum} count={pageCount} onChange={(e, val) => setPageNum(val)} />
      )}
      {reviewIds.map((id) => (
        <ProductReview id={id} />
      ))}
    </>
  );
};
