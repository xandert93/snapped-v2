import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';

import { Link } from '../../../components';

import { Product } from '../../../features/commerce/product/components';
import { fetchProduct } from '../../../features/commerce/product/state/current-product/current-product-actions';
import { clearProductPage } from '../../../features/commerce/product/state/current-product/current-product-slice';

import { selectIsProductFetching } from '../../../features/commerce/product/state/current-product/current-product-selectors';

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isFetching = useSelector(selectIsProductFetching);

  useEffect(() => {
    dispatch(fetchProduct(id));
    return () => dispatch(clearProductPage());
  }, [id]);

  return (
    <>
      <Link to="/shop">Back to da shop</Link>
      {isFetching ? <CircularProgress /> : <Product />}
    </>
  );
  //***  small bug is that, if reviews is zero, but then client adds one, <ProductReviews> mounts and fetches reviews from DB. But since we're using upsertOne in the slice, the manually added review is replaced with the database one. Negligible tbh
  // could also have suggested products lol - would need to query DB using tags or name etc.
};
