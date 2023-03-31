import { useSelector } from 'react-redux';
import { selectProductFeatures } from '../state/current-product/current-product-selectors';

export const ProductFeatureList = () => {
  const features = useSelector(selectProductFeatures);

  return (
    <ul>
      {features.map((feature) => (
        <li>{feature}</li>
      ))}
    </ul>
  );
};
