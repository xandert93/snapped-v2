import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'notification-avatar-container': {
    position: 'relative',
  },

  'notification-avatar-icon': {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },

  'notification-text': {
    // on non xs, clamp to 3 lines max
    [isVPMinSm]: {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      lineClamp: 3,
      overflow: 'hidden',
    },

    // prevent overflow over super long word e.g. 'yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas'
    wordBreak: 'break-word',
  },

  'notification-thumbnail': {
    display: 'block',
    width: 40,
    borderRadius: 4,
  },

  'notification-seen-icon': {
    alignSelf: 'center',
  },
}));

/*

*/
