import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'greeting-card': {
    margin: '0 auto',
    maxWidth: 640,
    boxShadow: theme.shadows[8],
    padding: theme.spacing(4),

    [isVPXs]: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      padding: theme.spacing(2),
    },
  },

  'suggested-users-container': {
    maxHeight: '55vh', //*** super duper hacky 😂, but it will do for now. Scared to use flex-box in case it messes up main ui
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
