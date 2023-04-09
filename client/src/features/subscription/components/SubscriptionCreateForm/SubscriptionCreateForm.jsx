import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';

import { formatCurrency } from '../../../../utils/formatters/currency-formatters';
import { productAPI } from '../../../commerce/product/api';
import { useHTTP } from '../../../../hooks';
import { GradientButton, Link, LoadingButton, Form } from '../../../../components';

import useStyles from './styles';

export const SubscriptionCreateForm = ({ subscriptions }) => {
  const [priceId, setPriceId] = useState('');
  const handleChange = (e) => setPriceId(e.target.value);

  const [isRequesting, errMessage, createSubscription] = useHTTP({
    request: productAPI.createSubscriptionCheckout,
    args: [priceId],
    onFetched: ({ checkoutURL }) => {
      window.location.href = checkoutURL;
    },
  });

  const classes = useStyles();
  return (
    <Grid
      className={classes['subscription-create-form']}
      container
      direction="column"
      alignItems="center"
      component={Form}
      onSubmit={createSubscription}>
      <SubscriptionRadioButtons {...{ priceId, handleChange, subscriptions }} />

      <Box py={1} px={2}>
        <SubscriptionDisclaimer />
      </Box>

      <LoadingButton
        className={classes['subscription-create-button']}
        type="submit"
        variant="contained"
        isLoading={isRequesting}
        disabled={!priceId || isRequesting}
        children="Start 1-Week Free Trial"
      />
    </Grid>
  );
};

const SubscriptionRadioButtons = ({ priceId, handleChange, subscriptions }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <RadioGroup
        className={classes['subscription-radio-group']}
        name="subscription"
        value={priceId}
        onChange={handleChange}>
        {subscriptions.map((subscription) => (
          <SubscriptionRadioCard key={subscription._id} currentValue={priceId} {...subscription} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const SubscriptionDisclaimer = () => {
  return (
    <Typography variant="caption" color="textSecondary">
      Features can change at any time. By subscribing, you agree to our{' '}
      <Link>Purchaser Terms of Service</Link>. The amount of the charge may change with notice.
      Subscriptions auto-renew until canceled. Cancel anytime.
    </Typography>
  );
};

// subscription => { _id, productId, priceId, name, description, imageURLs, features, price, recurrence, createdAt }

// .features is an empty array (can't do anything about that since it's a Stripe dashboard-only feature 😢)
// .recurrence => { interval, intervalCount, trialDayCount }

const SubscriptionRadioCard = ({ currentValue, ...subscription }) => {
  const { priceId, name, imageURLs, price, recurrence } = subscription;

  const classes = useStyles();
  return (
    <Card className={classes['subscription-radio-card']} raised={currentValue === priceId}>
      <FormControlLabel
        labelPlacement="start"
        control={<Radio required />}
        value={priceId}
        label={
          <Grid container direction="column" className={classes['subscription-radio-label']}>
            <SubscriptionHeader name={name} imageURL={imageURLs[0]} />
            <SubscriptionFeatureList name={name} />
            <SubscriptionPrice price={price} recurrence={recurrence} />
          </Grid>
        }
      />
    </Card>
  );
};

const SubscriptionHeader = ({ name, imageURL }) => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={2}>
        <SubscriptionImage src={imageURL} />
      </Grid>
      <Grid item xs={10}>
        <SubscriptionName name={name} />
      </Grid>
    </Grid>
  );
};

const SubscriptionImage = ({ src }) => {
  const classes = useStyles();

  return <img className={classes['subscription-image']} src={src} />;
};

const SubscriptionName = ({ name }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes['subscription-name']}
      variant="h6"
      component="h4"
      children={`snapped+ ${name}`}
    />
  );
};

// unfortunately, on Stripe Dashboard, when feature list is created on a product, it isn't part of the data sent by the webhook to my server.
// my server is unaware of it and thus, I'm having to manually write feature list here e.g.:

const features = {
  Basic: {
    '📸': 'Post more than 1 Snap per day',
    '👪': 'Post more than 3 pictures per Snap',
    '📹': 'Post videos',
    // 'See twice as many Snaps between ads in your timeline',
  },
  Pro: {
    '🚫': 'No more ads!',
    '🚀': 'Boosted ranking in replies and search',
    '✨': 'Gain early access to new features',
  },
};

const SubscriptionFeatureList = ({ name }) => {
  const classes = useStyles();
  return (
    <List>
      {Object.entries(features[name]).map(([emoji, feature]) => (
        <ListItem className={classes['subscription-feature']} key={emoji}>
          <ListItemIcon children={emoji} />
          <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2' }} />
        </ListItem>
      ))}
    </List>
  );
};

const SubscriptionPrice = ({ price, recurrence }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes['subscription-price']}
      color="textSecondary"
      variant="body2"
      children={`${formatCurrency(price)} / ${recurrence.interval}`}
    />
  );
};
