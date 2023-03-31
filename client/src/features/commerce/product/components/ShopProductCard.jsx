import { Rating } from '@material-ui/lab';
import { Link } from '../../../../components';
import { formatCurrency } from '../../../../utils/formatters/currency-formatters';

export const ShopProductCard = (props) => {
  const { _id, productId, priceId, name, imageURLs, price, rating } = props;

  return (
    <Link to={'/products/' + _id}>
      <h3>{name}</h3>
      <img src={imageURLs[0]} height={50} />
      <h5>{formatCurrency(price)}</h5>

      <Rating value={rating.average} precision={0.5} size="small" readOnly />
      <span>({rating.count})</span>
    </Link>
  );
};
