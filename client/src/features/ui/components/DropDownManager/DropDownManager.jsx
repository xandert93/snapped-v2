import { Menu } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DROPDOWNS } from '../../../../constants/modal-constants';
import { closeDropDown } from '../../state/ui-slice';
import { selectAnchorEl, selectDropDownId } from '../../state/ui-selectors';

import useStyles from './styles';
import { NavigationAccountList } from '../NavigationAccountList';

import { markNotificationsAsSeen } from '../../../notification/state/notification-slice';
import { NotificationMenu } from '../../../notification/components';

//<Menu> inherits from <Popover>: see playground here https://mui.com/components'/popover/#anchor-playground
//<Popover> inherits from <Modal> - as a result, when <Popover> open, page scroll and clicking away (outside of <Popover>) are blocked
//This is not the case with the <Popper>. When we need these two traits, MUI recommend creating a custom menu from a <MenuList> + <Popper>
const popoverProps = {
  getContentAnchorEl: null, //otherwise throws a stupid error (apparently fixed in MUI5)
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  transformOrigin: { vertical: 'top', horizontal: 'center' },
};

//could potentially go on <App> component, working in identical fashion to <DialogManager/>....
export const DropDownManager = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectDropDownId);

  const anchorEl = useSelector(selectAnchorEl);
  const handleClose = () => dispatch(closeDropDown());

  let props;
  switch (id) {
    case DROPDOWNS.NOTIFICATIONS:
      const handleNotificationMenuOpen = () => dispatch(markNotificationsAsSeen());

      props = {
        children: <NotificationMenu />,
        TransitionProps: {
          onEntering: handleNotificationMenuOpen,
        },
      };
      break;
    case DROPDOWNS.ACCOUNT:
      props = {
        children: <NavigationAccountList />,
      };
      break;
  }

  const classes = useStyles();
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      classes={{ paper: classes['dropdown-menu-paper'] }}
      MenuListProps={{ onClick: handleClose }}
      {...popoverProps}
      {...props}
    />
  );
};

/*
Other <Menu> props include:
- disableEnforceFocus //while open, allows focus to leave the modal
- disable //focus does not automatically move to modal on opening and back to previously focused element on close
- disableRestoreFocus //once closed, focus will now not be restored to previously focused element
*/

//identical toggle effect possible with these three lines. While more conventional, a little more code, but MUI docs recommend setting physical anchor element to state.
/*   
  const anchorRef = useRef(); //set on <IconButton>
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => setIsOpen((bool) => !bool); 
*/

/*tried to use <Popper> + <MenuList>, but set up was a total pain. Couldn't get it to work properly

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      placement="bottom-start"
      transition //required for some reason - apparently assists transition
      disablePortal //now mounts directly in DOM
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
          <Paper className={classes.dropdownMenuPaper}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                Item={isOpen}
                onClick={handleClose}
                {...props} /* onKeyDown={handleListKeyDown}
              />
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

*/
