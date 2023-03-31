import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useState, useEffect } from 'react';

import { formatCurrency } from '../../../../utils/formatters/currency-formatters';

import { productAPI } from '../api';

export const SubscriptionPurchaseButton = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = await productAPI.getSubscriptionProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const [priceId, setPriceId] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const handleChange = (e) => setPriceId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRequesting(true);

    try {
      const { checkoutURL } = await productAPI.createSubscriptionCheckout(priceId);
      window.location.href = checkoutURL;
    } catch (err) {
      alert(err);
    } finally {
      setIsRequesting(false);
    }
  };

  if (!products.length) return <CircularProgress />;
  else
    return (
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose a Subscription</FormLabel>
          <RadioGroup name="subscription" value={priceId} onChange={handleChange}>
            {products.map(
              ({
                _id,
                productId,
                priceId,
                name,
                description,
                imageURLs,
                features,
                price,
                recurrence, // { interval, intervalCount, trialDayCount }
                createdAt,
              }) => (
                <FormControlLabel
                  control={<Radio />}
                  value={priceId}
                  label={`${name} ${formatCurrency(price)} per ${recurrence.interval}`}
                />
              )
            )}
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            children={!isRequesting ? 'Start 1-Week Free Trial' : <CircularProgress />}
            disabled={isRequesting}
          />
        </FormControl>
      </form>
    );
};
