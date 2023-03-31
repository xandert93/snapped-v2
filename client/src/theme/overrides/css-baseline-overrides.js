import { isVPMaxSm } from '../media-queries';

export const cssBaselineOverrides = {
  MuiCssBaseline: {
    '@global': {
      // html: {
      //   fontSize: '62.5%',
      // },
      '*, *::before, *::after': {
        margin: 0,
        padding: 0,
        '-webkit-user-drag': 'none' /*NEW - prevents users from dragging <a> and <img>*/,
        'user-drag': 'none',
      },

      [isVPMaxSm]: {
        body: {
          userSelect: 'none',
        },
      },
    },
  },
};
