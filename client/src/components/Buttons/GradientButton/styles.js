import { makeStyles } from '@material-ui/core';

export default makeStyles(
  ({ palette }) => ({
    'gradient-button': {
      color: 'white',

      backgroundImage: ({ color1 = 'primary', color2 = 'secondary' }) => {
        return `linear-gradient(135deg, ${palette[color1].main} 20%, ${palette[color2].main} 100%)`;
      },
      backgroundSize: '220%',

      '&:hover, &:active': {
        backgroundPosition: 'right',
      },

      transition: 'background-position 0.7s, color 1.2s',

      '&.Mui-disabled': {
        backgroundImage: 'none', // so default MUI "disabled" backgroundColor is used
      },
    },
  }),
  { index: 1 }
);
