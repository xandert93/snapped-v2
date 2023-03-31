import { darkTheme, lightTheme } from './themes';
import { createTheme } from '@material-ui/core';

import { themeProps as props, genResponsiveTheme, breakpoints, mixins, typography } from './config';
import { isVPMinSm, isVPSm, isVPXs } from './media-queries';
import {
  genCardOverrides,
  cssBaselineOverrides,
  dialogOverrides,
  genSnackbarOverrides,
  genLinkOverrides,
  genProgressOverrides,
} from './overrides';

export const genAppTheme = (isDarkMode) => {
  const { palette, spacing, shadows } = isDarkMode ? darkTheme : lightTheme; // get auto-generated palette that we can access below

  const theme = createTheme({
    breakpoints,
    palette,
    typography,
    mixins,
    props,
    overrides: {
      ...cssBaselineOverrides,
      ...genSnackbarOverrides(palette, spacing),
      ...genLinkOverrides(palette),

      MuiAlert: {
        icon: {
          alignItems: 'center',
        },
      },

      MuiAlertTitle: {
        root: {
          marginBottom: 0, // has gutterbottom* applied
          fontWeight: 'bold',
        },
      },

      MuiToolbar: {
        root: {
          // [isVPXs]: {
          //   padding: '0 8px', //0 16px* (too big)
          // },
        },
      },

      MuiSvgIcon: {
        root: {
          fontSize: undefined, // so I can use my custom responsive <Icon>
        },
      },

      MuiContainer: {
        root: {
          // unable to use shorthand here, because MUI has `padding-left` and `padding-right` applied that will override the shorthand setting
          [isVPMinSm]: {
            paddingTop: spacing(2),
            paddingBottom: spacing(2),
            paddingLeft: spacing(2),
            paddingRight: spacing(2),
          },
          [isVPXs]: {
            paddingTop: spacing(1),
            paddingBottom: spacing(1),
            paddingLeft: spacing(1),
            paddingRight: spacing(1),
          },
        },
      },

      MuiButton: {
        root: {
          padding: spacing(1, 2), // 6px 16px*
        },

        contained: {
          color: 'white',
          backgroundColor: palette.primary.main,

          '&:hover': {
            backgroundColor: palette.secondary.main,
          },
        },

        containedPrimary: {
          color: 'white',
        },

        label: {
          textTransform: 'none', // 'uppercase'*
        },

        iconSizeMedium: {
          '& > *:first-child': {
            fontSize: 30,
          },
        },
      },

      MuiIconButton: {
        root: {
          padding: 0,
        },
      },

      MuiFab: {
        root: {
          color: 'inherit', // black*

          height: spacing(9),
          width: spacing(9),

          [isVPSm]: {
            height: spacing(8),
            width: spacing(8),
          },

          [isVPXs]: {
            height: spacing(7),
            width: spacing(7),
          },
        },
      },

      //<TextField label=""/> size (basically, the placeholder)
      /*     MuiFormLabel: {
        root: {
          [isVPXs]: {
            fontSize: 16, //*1.17rem (slightly too big)
          },
        },
      }, */

      //client's text inside the <TextField/>
      /*     MuiInputBase: {
        root: {
          [isVPXs]: {
            fontSize: 16, //*1.17rem (slightly too big)
          },
        },
      }, */

      //<TextField:select />'s popover paper
      MuiMenuItem: {
        root: {
          //CSS white-space specifies how white-space inside an element is handled
          whiteSpace: 'normal', //*'nowrap' (not good for notifications which often need to wrap onto next line)
        },
      },

      //<RadioGroup>'s labels
      MuiFormControlLabel: {
        label: {
          [isVPXs]: {
            fontSize: spacing(2), //*1.17rem (slightly too big)
          },
        },
      },

      //avatar ripple effect...pretty cool!: https://mui.com/components/avatars/#with-badge
      MuiAvatar: {
        root: {
          height: spacing(7), // 40*
          width: spacing(7), // 40*

          // [isVPXs]: {
          //   height: spacing(5),
          //   width: spacing(5),
          // },
        },

        // when no valid `src` is supplied
        colorDefault: {
          backgroundColor: palette.background.default, // grey* (ugly)
          color: palette.text.secondary,
        },

        fallback: {
          width: '100%', // '75%'*
          padding: spacing(2),

          [isVPXs]: {
            padding: spacing(1),
          },
        },
      },

      ...genCardOverrides(),

      MuiBottomNavigation: {
        root: {
          height: spacing(8), // 56px*

          [isVPXs]: {
            height: spacing(7),
          },
        },
      },

      MuiBottomNavigationAction: {
        root: {
          color: palette.text.primary,
          padding: 0,
          maxWidth: 'initial', // 168px* (too small for sm)

          '&$selected': {
            paddingTop: 0,
          },

          '&$iconOnly': {
            paddingTop: 0,
          },
        },
      },

      MuiListItemIcon: {
        root: {
          minWidth: spacing(5), // 56px* (too big and looks shit)
        },
      },

      MuiStepper: {
        root: {
          marginRight: spacing(3),
          padding: '0 24px',

          [isVPXs]: {
            padding: 0,
          },
        },
      },

      MuiStepConnector: {
        lineVertical: {
          minHeight: 0, //24* (looks a lot cleaner with it completely collapsed)
        },
      },
      MuiTab: {
        root: {
          minWidth: spacing(7), // 72* (too big)
          textTransform: 'none', // 'uppercase'*
        },
      },
      MuiTabs: {
        indicator: {},
      },

      ...dialogOverrides,

      ...genProgressOverrides(palette),

      MuiDivider: {
        root: {
          background: `linear-gradient(135deg, ${palette.secondary.dark}, ${palette.primary.dark}, ${palette.secondary.dark})`,
        },
      },
    },
  });

  return genResponsiveTheme(theme);
};
