import { Card, CircularProgress, Typography, Grid, Fade } from '@material-ui/core';

import { useHTTP, useMountEffect } from '../../../../hooks';
import { useState } from 'react';
import { productAPI } from '../../../commerce/product/api';
import { SubscriptionCreateForm } from '../SubscriptionCreateForm';

import useStyles from './styles';

export const SubscriptionCreateCard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [isFetching, , fetchSubscriptions] = useHTTP({
    request: productAPI.getSubscriptionProducts,
    onFetched: ({ products }) => setSubscriptions(products),
  });

  useMountEffect(fetchSubscriptions);

  const classes = useStyles();

  if (isFetching) return <CircularProgress size={40} />;

  return (
    <Fade in timeout={800}>
      <Card
        className={classes['subscription-create-card']}
        elevation={8}
        component={Grid}
        container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <SubscriptionHeading />
        <SubscriptionSubHeading />
        <SubscriptionCreateForm subscriptions={subscriptions} />
      </Card>
    </Fade>
  );
};

const SubscriptionHeading = () => {
  const classes = useStyles();

  return (
    <Typography
      className={classes['subscription-create-heading']}
      component="h2"
      variant="h5"
      children="Subscribe to Snapped+"
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
