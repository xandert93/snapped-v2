import { Rating } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { selectProductRatingCount } from '../state/current-product/current-product-selectors';

export const ProductRating = () => {
  const { average, count } = useSelector(selectProductRatingCount);

  return (
    <>
      <Rating value={average} precision={0.5} size="small" readOnly />
      <span>({count})</span>
    </>
  );
};
