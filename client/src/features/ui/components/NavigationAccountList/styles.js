import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'navigation-account-item': {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },

  'navigaton-account-profile': {
    padding: 0,
  },

  'navigation-account-item-content': {
    marginTop: 6, // 4px* - hacky, but ensures alignment with icon
  },

  'navigation-account-item-text': {
    fontWeight: 'bold',
  },

  '@keyframes shimmer': {
    '0%': { 'background-position': '300%' },
    '100%': { 'background-position': 'left' },
  },

  'snapped-premium-link': {
    background: 'linear-gradient(60deg, #0000 20%, #8a6e08, #0000 70%) right/300% 100%',
    animation: '$shimmer 7s infinite linear',
  },
}));
