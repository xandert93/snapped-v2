import { Button, CircularProgress } from '@material-ui/core';

import { productAPI } from '../../commerce/product/api';
import { useHTTP } from '../../../hooks';
import { LoadingButton } from '../../../components';

export const SubscriptionManagementButton = () => {
  const [isRequesting, errMessage, handleClick] = useHTTP({
    request: productAPI.manageSubscription,
    onFetched: ({ billingURL }) => (window.location.href = billingURL),
  });

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      isLoading={isRequesting}
      children="Manage Subscription"
    />
  );
};
