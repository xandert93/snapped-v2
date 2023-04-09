import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../theme/media-queries';

export default makeStyles((theme) => ({
  'subscription-main': {
    [isVPMaxSm]: {
      display: 'flex',
      // so that we can vertically center <SubscriptionCard> in remaining space
      // not applying on all screen sizes, otherwise if user zooms out they will see super elongated child <SubscriptionCard>...try it!
    },
  },
}));
