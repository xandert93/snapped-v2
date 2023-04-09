import { AppBar, Box, CircularProgress, Divider, Toolbar, Typography } from '@material-ui/core';

import { Notification } from '../Notification';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAreNotificationsFetching,
  selectHasMoreNotifications,
} from '../../state/notification-selectors';
import { selectNotificationIds } from '../../state/notification-slice';

import useStyles from './styles';
import { NoDataText, ScrollEndText } from '../../../../components';
import { useInfiniteScroll } from '../../../../hooks';
import { fetchNotifications } from '../../state/notification-actions';

export const NotificationMenu = () => {
  const isFetching = useSelector(selectAreNotificationsFetching);
  const notificationIds = useSelector(selectNotificationIds);
  const hasMore = useSelector(selectHasMoreNotifications);

  const hasNotifications = notificationIds.length;

  const foundNoNotifications = !isFetching && !hasNotifications;

  const dispatch = useDispatch();

  const fetch = () => dispatch(fetchNotifications());

  const watchNotification = useInfiniteScroll({ callback: fetch, hasMore });

  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar
          variant="dense"
          children={<Typography component="h2" variant="h6" children="Notifications" />}
        />
      </AppBar>
      <Divider />

      <Box className={classes['notifications']}>
        <Box>
          {notificationIds.map((id) => (
            <Notification
              key={id}
              id={id}
              {...(id === notificationIds.at(-1) && { watchNotification })}
            />
          ))}
          {!isFetching && !hasMore && hasNotifications && (
            <Box p={1}>
              <ScrollEndText />
            </Box>
          )}
        </Box>
        {isFetching && (
          <Box p={1} style={{ textAlign: 'center' }}>
            <CircularProgress size="2rem" />
          </Box>
        )}
        {foundNoNotifications && (
          <Box p={1}>
            <NoDataText align="center" children="You have no notifications yet" />
          </Box>
        )}
      </Box>
    </>
  );
};

// I did try to use a flexbox <Grid> above, but I kept getting vertical overscroll
// maybe one to try another time...
