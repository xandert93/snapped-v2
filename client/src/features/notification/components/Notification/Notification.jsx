import { Box, Grid, MenuItem, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead, selectNotificationById } from '../../state/notification-slice';

import { genRelativeDateStr } from '../../../../utils/formatters/date-formatters';

import useStyles from './styles';

import {
  CldAvatar,
  CommentIconFilled,
  FlameIcon,
  FollowedIcon,
  CircleIconFilled,
  Link,
  CldThumb,
  Icon,
} from '../../../../components';
import { genSnapPath, genProfilePath } from '../../../../utils/routing-utils';

const genNotifData = (type) => {
  switch (type) {
    case 'follow':
      return { action: 'followed', AvatarIcon: FollowedIcon, subject: 'you' };
    case 'like':
      return { action: 'liked', AvatarIcon: FlameIcon, subject: 'your snap' };
    case 'comment':
      return { action: 'commented on', AvatarIcon: CommentIconFilled, subject: 'your snap' };
    /*
    case 'share':
      return { action: 'shared', Icon: null, subject: 'your snap' };
    case 'report':
      return { action: 'reported', Icon: null, subject: 'your snap' };
*/
  }
};

export const Notification = ({ id, watchNotification }) => {
  const dispatch = useDispatch();

  const {
    sender: { _id: senderId, username, avatarId },
    type,
    isRead,
    createdAt,
    //*** not on follow notif:
    details: { snapId, imageId, comment } = {},
  } = useSelector(selectNotificationById(id));

  const { action, AvatarIcon, subject } = genNotifData(type);

  const handleClick = () => dispatch(markNotificationAsRead(id));

  const classes = useStyles();
  return (
    <MenuItem
      ref={watchNotification}
      className={classes['notification']}
      disableGutters
      onClick={handleClick}
      component={Link}
      to={!snapId ? genProfilePath(username) : genSnapPath(snapId)}>
      <Grid container spacing={2} component={Box} p={1} wrap="nowrap">
        <Grid item>
          <NotificationAvatar
            srcId={avatarId}
            children={username[0]}
            Icon={AvatarIcon}
            isRead={isRead}
          />
        </Grid>
        <Grid item xs={12} container wrap="nowrap" spacing={1} alignItems="center">
          <Grid item container direction="column">
            <NotificationText {...{ username, action, subject, comment, isRead }} />
            <NotificationTimestamp {...{ createdAt, isRead }} />
          </Grid>
          <Grid item>
            <NotificationThumbnail srcId={imageId} />
          </Grid>
        </Grid>
        <Grid item className={classes['notification-seen-icon']}>
          {!isRead && <Icon variant="caption" component={CircleIconFilled} color="primary" />}
        </Grid>
      </Grid>
    </MenuItem>
  );
};

const NotificationAvatar = ({ srcId, children, Icon, isRead }) => {
  const classes = useStyles();
  return (
    <Box className={classes['notification-avatar-container']}>
      <CldAvatar srcId={srcId} children={children} />
      <Icon
        className={classes['notification-avatar-icon']}
        color={!isRead ? 'primary' : 'disabled'}
      />
    </Box>
  );
};

const NotificationText = ({ username, action, subject, comment, isRead }) => {
  const classes = useStyles();
  return (
    <Typography
      className={classes['notification-text']}
      variant="body2"
      color={!isRead ? 'textPrimary' : 'textSecondary'}>
      <strong>{username}</strong> {action} {subject}
      {comment && <>: "{comment.text}"</>}
    </Typography>
  );
};

const NotificationTimestamp = ({ createdAt, isRead }) => {
  const timeAgo = genRelativeDateStr(new Date(createdAt));

  return (
    <Typography
      variant="caption"
      color={!isRead ? 'primary' : 'textSecondary'}
      style={{ fontWeight: 'bold' }}
      children={timeAgo}
    />
  );
};

const NotificationThumbnail = ({ srcId }) => {
  const classes = useStyles();
  return <CldThumb className={classes['notification-thumbnail']} srcId={srcId} />;
};
