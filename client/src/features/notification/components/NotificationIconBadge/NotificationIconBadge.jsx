import { useSelector } from 'react-redux';

import { Badge } from '@material-ui/core';
import { Notifications as NotificationIcon } from '@material-ui/icons';

import useStyles from './styles';
import { selectUnseenNotificationCount } from '../../state/notification-selectors';

export const NotificationIconBadge = () => {
  const unseenCount = useSelector(selectUnseenNotificationCount);

  const classes = useStyles();
  return (
    <Badge
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // default*
      overlap="rectangular" // default*
      badgeContent={unseenCount}
      invisible={!unseenCount}
      color="error">
      <NotificationIcon />
    </Badge>
  );
};
