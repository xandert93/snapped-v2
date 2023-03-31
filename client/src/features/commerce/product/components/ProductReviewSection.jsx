import { useSelector } from 'react-redux';

import {
  selectProductLastOrderByUser,
  selectProductRatingCount,
} from '../state/current-product/current-product-selectors';

import { ProductReviewForm } from './ProductReviewForm';
import { ProductReviewList } from './ProductReviewList';

export const ProductReviewSection = () => {
  const ratingCount = useSelector(selectProductRatingCount);
  const lastOrderByUser = useSelector(selectProductLastOrderByUser);

  return (
    <section>
      {ratingCount ? <ProductReviewList /> : 'No reviews'}
      {lastOrderByUser && <ProductReviewForm />}
    </section>
  );
};
