import { Main } from '../../components';
import { SubscriptionCreateCard } from '../../features/subscription/components';
import useStyles from './styles';

export const SubscriptionPage = () => {
  const classes = useStyles();
  return (
    <Main className={classes['subscription-main']}>
      <SubscriptionCreateCard />
    </Main>
  );
};
