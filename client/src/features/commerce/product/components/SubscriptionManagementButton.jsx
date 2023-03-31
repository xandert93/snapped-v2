import { Button, CircularProgress } from '@material-ui/core';
import { useState } from 'react';

import { productAPI } from '../api';

export const SubscriptionManagementButton = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleClick = async () => {
    setIsRequesting(true);

    try {
      const { billingURL } = await productAPI.manageSubscription();
      window.location.href = billingURL;
    } catch (err) {
      alert(err);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Button
      type="submit"
      id="manage-subscription-button"
      variant="contained"
      color="primary"
      onClick={handleClick}
      disabled={isRequesting}
      children={!isRequesting ? 'Manage Subscription' : <CircularProgress />}
    />
  );
};
