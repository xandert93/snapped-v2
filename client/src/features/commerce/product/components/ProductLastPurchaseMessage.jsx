import { useSelector } from 'react-redux';
import { genRelativeDateStr } from '../../../../utils/formatters/date-formatters';
import { selectProductLastPurchasedAt } from '../state/current-product/current-product-selectors';

export const ProductLastPurchaseMessage = () => {
  const lastPurchasedAt = useSelector(selectProductLastPurchasedAt);

  const dateStr = lastPurchasedAt ? genRelativeDateStr(new Date(lastPurchasedAt)) : 'Never!';

  return <p>Last purchased: {dateStr}</p>;
};
