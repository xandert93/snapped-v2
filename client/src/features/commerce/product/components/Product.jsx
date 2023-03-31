import { useSelector } from 'react-redux';

import { selectProductLastOrderByUser } from '../state/current-product/current-product-selectors';

import { ProductLastPurchasedByUserMessage } from './ProductLastPurchasedByUserMessage';
import { ProductFeatureList } from './ProductFeatureList';
import { ProductImageList } from './ProductImageList';
import { ProductRating } from './ProductRating';
import { ProductLastPurchaseMessage } from './ProductLastPurchaseMessage';
import { ProductDescription } from './ProductDescription';
import { ProductPrice } from './ProductPrice';
import { ProductName } from './ProductName';
import { ProductAvailabilityMessage } from './ProductAvailabilityMessage';
import { ProductStockActions } from './ProductStockActions';
import { SuggestedProducts } from './SuggestedProducts';
import { ProductReviewSection } from './ProductReviewSection';

export const Product = () => {
  const lastOrderByUser = useSelector(selectProductLastOrderByUser);

  return (
    <>
      {lastOrderByUser && <ProductLastPurchasedByUserMessage />}
      <ProductName />
      <ProductRating />
      <ProductPrice />
      <ProductImageList />
      <ProductDescription />
      <ProductFeatureList />
      <ProductAvailabilityMessage />
      <ProductLastPurchaseMessage />
      <ProductStockActions />
      <SuggestedProducts />
      <ProductReviewSection />
    </>
  );
};
