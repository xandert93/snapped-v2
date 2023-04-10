import { CircularProgress, Typography, Fade } from '@material-ui/core';

import { useHTTP, useMountEffect } from '../../../../hooks';
import { useState } from 'react';
import { productAPI } from '../../../commerce/product/api';
import { SubscriptionCreateForm } from '../SubscriptionCreateForm';
import { SubscriptionCard } from '../SubscriptionCard';

import useStyles from './styles';

export const SubscriptionCreateCard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [isFetching, , fetchSubscriptions] = useHTTP({
    request: productAPI.getSubscriptionProducts,
    onFetched: ({ products }) => setSubscriptions(products),
  });

  useMountEffect(fetchSubscriptions);

  if (isFetching) return <CircularProgress size={40} />;
  else
    return (
      <SubscriptionCard>
        <SubscriptionHeading />
        <SubscriptionSubHeading />
        <SubscriptionCreateForm subscriptions={subscriptions} />
      </SubscriptionCard>
    );
};

const SubscriptionHeading = () => {
  const classes = useStyles();

  return (
    <Typography
      className={classes['subscription-create-heading']}
      component="h2"
      variant="h5"
      children="Subscribe to snapped+"
    />
  );
};

const SubscriptionSubHeading = () => {
  return (
    <Typography
      component="h3"
      color="textSecondary"
      children="Get exclusive and pre-release features"
    />
  );
};
