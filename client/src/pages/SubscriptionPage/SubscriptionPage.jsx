import { useSelector } from 'react-redux';
import { Main } from '../../components';
import {
  SubscriptionCreateCard,
  SubscriptionDetailsCard,
} from '../../features/subscription/components';
import { selectIsAuthUserSubscriber } from '../../features/user/state/user-selectors';
import useStyles from './styles';
import { Fade } from '@material-ui/core';

export const SubscriptionPage = () => {
  const isSubscriber = useSelector(selectIsAuthUserSubscriber);

  const classes = useStyles();
  return (
    <Main className={classes['subscription-main']}>
      <Fade in timeout={800}>
        {!isSubscriber ? <SubscriptionCreateCard /> : <SubscriptionDetailsCard />}
      </Fade>
    </Main>
  );
};

// really, subscription create card stuff should all be in here etc.
