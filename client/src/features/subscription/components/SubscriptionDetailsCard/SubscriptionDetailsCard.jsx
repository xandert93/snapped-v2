import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';

import { SubscriptionCard } from '../SubscriptionCard';
import {
  selectAuthUserSubscription,
  selectAuthUserSubscriptionName,
} from '../../../user/state/user-selectors';

import {
  genDateAndTimeStr,
  genRelativeDateStr,
} from '../../../../utils/formatters/date-formatters';

import { useHTTP } from '../../../../hooks';
import { productAPI } from '../../../commerce/product/api';
import { LoadingButton } from '../../../../components';

import { goldCrown, silverCrown } from '../../assets';

import useStyles from './styles';

export const SubscriptionDetailsCard = () => {
  return (
    <SubscriptionCard>
      <SubscriptionImage />
      <SubscriptionDetails />
      <SubscriptionManagementButton />
    </SubscriptionCard>
  );
};

const SubscriptionImage = () => {
  const name = useSelector(selectAuthUserSubscriptionName);

  return (
    <img
      style={{ display: 'block', width: '20%' }}
      src={name === 'Pro' ? goldCrown : silverCrown}
      alt={name}
    />
  );
};

const SubscriptionDetails = () => {
  const { name, isTrialling, endingAt, isEnding } = useSelector(selectAuthUserSubscription);

  const endingAtDate = new Date(endingAt);
  const endDateStr = genDateAndTimeStr(endingAtDate);
  const remainingTime = genRelativeDateStr(endingAtDate);

  const classes = useStyles();
  return (
    <Grid container direction="column" style={{ gap: 16 }} component={Box} p={[2, 3]}>
      <Typography>You are subscribed to:</Typography>

      <Typography variant="h5" component="p" align="center">
        <b className={classes['subscription-name']}>snapped+ {name}</b>
      </Typography>

      {isTrialling && (
        <Typography>
          Your trial expires <b>{remainingTime}</b>
        </Typography>
      )}
      <Typography>Your subscription will {isEnding ? 'end' : 'renew'} on:</Typography>
      <Typography variant="h6" component="p" align="center">
        <b>{endDateStr}</b>
      </Typography>

      <Typography>
        Want to change your plan? Upgrade or cancel by clicking the button below
      </Typography>
    </Grid>
  );
};

const SubscriptionManagementButton = () => {
  const [isRequesting, errMessage, handleClick] = useHTTP({
    request: productAPI.manageSubscription,
    onFetched: ({ billingURL }) => {
      window.location.href = billingURL;
    },
  });

  return (
    <LoadingButton
      variant="contained"
      onClick={handleClick}
      isLoading={isRequesting}
      children="Manage Subscription"
    />
  );
};
