import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'navigation-account-item': {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },

  'navigation-account-item-content': {
    marginTop: 6, // 4px* - hacky, but ensures alignment with icon
  },

  '@keyframes shimmer': {
    '0%': { 'background-position': '300%' },
    '100%': { 'background-position': 'left' },
  },

  'snapped-premium-link': {
    background: 'linear-gradient(60deg, #0000 20%, #785f05, #0000 70%) right/300% 100%',
    animation: '$shimmer 7s infinite linear',
  },

  'snapped-premium-icon': {
    color: 'gold',
  },

  'snapped-premium-text': {
    fontWeight: 'bold',
    color: 'gold',
  },
}));
