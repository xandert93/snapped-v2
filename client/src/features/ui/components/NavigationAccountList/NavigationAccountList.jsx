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
} from '../../../user/state/user-selectors';

import {
  Link,
  SettingsIcon,
  LogoutIcon,
  SunIcon,
  SecurityIcon,
  ContactIcon,
} from '../../../../components';
import { genProfilePath } from '../../../../utils/routing-utils';

import useStyles from './styles';
import { PATHS } from '../../../../constants/routing-constants';

export const NavigationAccountList = () => {
  const dispatch = useDispatch();

  const isVerified = useSelector(selectAuthUserIsVerified);

  const items = {
    ...(!isVerified && {
      activation: {
        Icon: () => <SecurityIcon color="primary" />,
        props: { onClick: () => dispatch(openDialog(DIALOGS.ACTIVATION)) },
        contentProps: { primary: 'Activate Account' },
      },
    }),

    profile: {
      contentProps: {
        primary: <SeeProfileItem />,
      },
    },

    theme: {
      Icon: SunIcon,
      props: {
        onClick: (e) => e.stopPropagation(), // 1
        button: false,
      },
      contentProps: {
        primary: <ThemeSwitch />,
      },
    },

    contact: {
      Icon: ContactIcon,
      contentProps: {
        primary: 'Contact us',
        secondary: 'Tissues 4 ur issues',
      },
    },

    settings: {
      Icon: SettingsIcon,
      props: {
        component: Link, //*** makes text go purple
        to: PATHS.ACCOUNT,
      },
      contentProps: {
        primary: 'Settings & Privacy',
        secondary: 'Change shit',
      },
    },

    logout: {
      Icon: () => <LogoutIcon color="secondary" />,
      props: {
        onClick: () => dispatch(openConfirmDialog(DIALOGS.LOGOUT)),
      },
      contentProps: {
        primary: 'Log out',
      },
    },
  };

  return Object.values(items).map(({ Icon, props, contentProps }, index) => (
    <MenuItem key={index} {...props} divider={false}>
      {Icon && <MenuItemIcon children={<Icon />} />}
      <MenuItemContent {...contentProps} />
    </MenuItem>
  ));
};

/*

1) On <MenuList> i.e. root <ul>, the `onClick` I provided it intentionally closes <SideNavigation> 
   (or the <DropdownManager>).
   
   While this is fine for all items, this should not be the case for the <ThemeSwitch> item.
   Firstly, we stop the `onClick` propagation bubbling up to the <ul>.
   Secondly "button=false" prevents "MuiButtonBase" class from being applied (no ripple or "cursor:pointer").

*/

function SeeProfileItem() {
  const username = useSelector(selectAuthUserUsername);

  return (
    <CardHeader
      avatar={<AuthUserAvatar fontSize={32} border />}
      title={username}
      titleTypographyProps={{
        variant: 'body2',
        style: { fontWeight: 400, letterSpacing: 0 },
        noWrap: true,
        // className: classes.cardTitle,
      }}
      subheader="See your profile"
      subheaderTypographyProps={{
        variant: 'subtitle2',
        // className: classes.cardSubheader,
      }}
      component={Link}
      to={genProfilePath(username)}
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
