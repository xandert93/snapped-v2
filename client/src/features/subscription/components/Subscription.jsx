import { useSelector } from 'react-redux';
import { genDateAndTimeStr, genRelativeDateStr } from '../../../utils/formatters/date-formatters';
import { selectAuthUserSubscription } from '../../user/state/user-selectors';
import { SubscriptionManagementButton } from './SubscriptionManagementButton';

export const Subscription = () => {
  const { name, isTrialling, endingAt, isEnding } = useSelector(selectAuthUserSubscription);

  const endingAtDate = new Date(endingAt);
  const endDateStr = genDateAndTimeStr(endingAtDate);
  const remainingTime = genRelativeDateStr(endingAtDate);

  if (!name) return 'go get a subscription mate';
  else
    return (
      <>
        <p>You are currently on the {name} plan</p>
        {isTrialling && <p>Your trial expires {remainingTime}</p>}
        <p>
          Your subscription will {isEnding ? 'end' : 'renew'} on {endDateStr}
        </p>

        <p>Want to update your current plan? Upgrade or Cancel by clicking the button below</p>
        <SubscriptionManagementButton />
      </>
    );
};
