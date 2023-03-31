import { makeStyles, alpha } from '@material-ui/core';
import { isVPMinLg, isVPXl } from '../../../../../theme/media-queries';

export default makeStyles((theme) => ({
  searchInputBase: {
    borderRadius: theme.shape.borderRadius * 8,

    transition: theme.transitions.create('background-color'),
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.light, 0.35),
    },
  },

  searchInput: {
    '&::placeholder': {
      textAlign: 'center',
    },

    transition: theme.transitions.create('width', { duration: 500 }),
    width: '20ch', //didn't play nicely with percentages
    '&:focus': {
      [isVPMinLg]: { width: '25ch' },
      [isVPXl]: { width: '30ch' },
    },
  },
}));
