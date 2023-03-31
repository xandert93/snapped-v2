import { makeStyles } from '@material-ui/core';
import { isVPSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'dialog-snap-card-content': {
    display: 'flex',
    flexDirection: 'column',

    height: 0, // when `height` is used with `flex-grow` in a `column` container, it acts as a suggested height before the `flex-grow` factor is factored in. `height` is required here to enable scrolling: https://stackoverflow.com/questions/14962468/how-can-i-combine-flexbox-and-vertical-scroll-in-a-full-height-app
    flexGrow: 1,
    overflowY: 'auto',

    [isVPSm]: {
      minHeight: '30vh',
      maxHeight: '50vh',
    },

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
