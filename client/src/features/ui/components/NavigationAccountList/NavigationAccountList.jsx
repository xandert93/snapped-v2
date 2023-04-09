import { useDispatch, useSelector } from 'react-redux';
import {
  MenuItem,
  ListItemIcon as MenuItemIcon,
  ListItemText as MenuItemContent,
  CardHeader,
} from '@material-ui/core';

import { openConfirmDialog, openDialog } from '../../state/ui-slice';

import { DIALOGS } from '../../../../constants/modal-constants';

import { AuthUserAvatar } from '../../../user/components';
import { ThemeSwitch } from '../ThemeSwitch';
import {
  selectAuthUserIsVerified,
  selectAuthUserUsername,
  selectIsAuthUserSubscriber,
} from '../../../user/state/user-selectors';

import {
  Link,
  SettingsIcon,
  LogoutIcon,
  SunIcon,
  SecurityIcon,
  ContactIcon,
  SubscriptionIcon,
  Icon,
} from '../../../../components';
import { genProfilePath } from '../../../../utils/routing-utils';

import { PATHS } from '../../../../constants/routing-constants';

import clsx from 'clsx';

import useStyles from './styles';

export const NavigationAccountList = () => {
  const dispatch = useDispatch();

  const username = useSelector(selectAuthUserUsername);
  const isVerified = useSelector(selectAuthUserIsVerified);
  const isSubscriber = useSelector(selectIsAuthUserSubscriber);

  const classes = useStyles();

  const items = {
    ...(!isVerified && {
      activation: {
        props: {
          onClick: () => dispatch(openDialog(DIALOGS.ACTIVATION)),
        },
        iconProps: {
          component: SecurityIcon,
          color: 'primary',
        },
        contentProps: {
          primary: 'Activate Account',
        },
      },
    }),

    profile: {
      props: {
        component: Link,
        to: genProfilePath(username),
      },

      contentProps: {
        primary: <SeeProfileItem username={username} />,
      },
    },

    theme: {
      props: {
        onClick: (e) => e.stopPropagation(), // 1
        button: false,
      },
      iconProps: {
        component: SunIcon,
      },
      contentProps: {
        primary: <ThemeSwitch />,
      },
    },

    subscription: {
      className: clsx(!isSubscriber && classes['snapped-premium-link']),
      props: {
        component: Link, //*** makes text go purple when hovered
        to: PATHS.SUBSCRIPTION,
      },
      iconProps: {
        component: SubscriptionIcon,
        style: { color: 'gold' },
      },
      contentProps: {
        primary: 'Snapped+',
        secondary: 'Exclusive features',
        style: { color: 'gold' },
      },
    },

    contact: {
      iconProps: {
        component: ContactIcon,
      },
      contentProps: {
        primary: 'Contact us',
      },
    },

    settings: {
      props: {
        component: Link, //*** makes text go purple when hovered
        to: PATHS.ACCOUNT,
      },
      iconProps: {
        component: SettingsIcon,
      },
      contentProps: {
        primary: 'Settings',
      },
    },

    logout: {
      iconProps: {
        component: LogoutIcon,
        color: 'secondary',
      },
      props: {
        onClick: () => dispatch(openConfirmDialog(DIALOGS.LOGOUT)),
      },
      contentProps: {
        primary: 'Log out',
      },
    },
  };

  return Object.values(items).map((data, index) => <NavigationAccountItem key={index} {...data} />);
};

const NavigationAccountItem = ({ className, props, iconProps, contentProps }) => {
  const classes = useStyles();

  return (
    <MenuItem className={clsx(classes['navigation-account-item'], className)} {...props}>
      {iconProps && <MenuItemIcon children={<Icon variant="h5" {...iconProps} />} />}
      <MenuItemContent
        className={classes['navigation-account-item-content']}
        {...contentProps}
        primaryTypographyProps={{ className: classes['navigation-account-item-text'] }}
      />
    </MenuItem>
  );
};

/*

<MenuItem> also accepts a Boolean `divider` prop (*false).

1) On <MenuList> i.e. root <ul>, the `onClick` I provided it intentionally closes <SideNavigation> 
   (or the <DropdownManager>).
   
   While this is fine for all items, this should not be the case for the <ThemeSwitch> item.
   Firstly, we stop the `onClick` propagation bubbling up to the <ul>.
   Secondly "button=false" prevents "MuiButtonBase" class from being applied (no ripple or "cursor:pointer").

*/

function SeeProfileItem({ username }) {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes['navigaton-account-profile']}
      avatar={<AuthUserAvatar fontSize={32} border />}
      title={username}
      titleTypographyProps={{
        variant: 'body2',
        style: { fontWeight: 400, letterSpacing: 0 },
        noWrap: true,
      }}
      subheader="See your profile"
      subheaderTypographyProps={{ variant: 'subtitle2' }}
    />
  );
}

/*
<List> outputs <ul> and <ListItem> outputs a flex <li>. 
<ListItem>'s two children (<ListItemIcon> and <ListItemContent>) both output flex-item <div>s
<Menu> and <MenuItem> inherit from each respectively and exhibit the same behaviour as above.

<List>'s "disablePadding" prop removes default "padding: spacing(1) 0" from <ul>

<ListItem> Boolean "button" prop turns this to <div> which ripples and uses "cursor:pointer".
This is achieved by the prop enabling the "MuiButtonBase-root" class on it. However,
<MenuItem>'s uses the "MuiButtonBase-root" class by default 

<ListItemContent> "primary" (alias for "children" prop) and "secondary" prop denote separate-rowed content

<Menu>s should be used to display a list of choices on a "temporary surface" 
e.g. a modal - in our case this includes <Drawer> (side navigation) or a <Popper> (dropdown).

<MenuList> applies "role="menu"" attribute on root <ul>. Also handles focus, apparently.
*/
