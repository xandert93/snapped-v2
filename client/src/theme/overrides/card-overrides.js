import { isVPMaxSm, isVPXs } from '../media-queries';

export const genCardOverrides = () => ({
  MuiCard: {
    root: {
      borderRadius: 20,
    },
  },

  MuiCardHeader: {
    root: {
      padding: 12, // 16px*
      gap: 12,
      [isVPXs]: {
        paddingLeft: 8,
        paddingRight: 8,
      },
    },

    avatar: {
      marginRight: undefined, // using `gap` above instead
    },

    title: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      [isVPXs]: {
        lineHeight: 1.4, //1.5*
      },
    },

    subheader: {
      [isVPXs]: {
        lineHeight: 1.4, //1.6*
      },
    },

    action: {
      alignSelf: 'initial', //flex-start* (ugly)
      marginTop: 'initial', //-8px* (ugly)
      marginRight: 'initial', //-8px* (ugly)
    },
  },

  MuiCardContent: {
    root: {
      padding: '10px 14px', //16px*
      [isVPXs]: {
        padding: '8px 12px',
      },
      '&:last-child': {
        paddingBottom: '10px', //24px* (massive)
      },
    },
  },
});
