import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MoreVertIcon, UpdateIcon, DeleteIcon, Icon } from '../../../../components';
import { DIALOGS } from '../../../../constants/modal-constants';
import { useToggle } from '../../../../hooks';
import { openDialog, openConfirmDialog, closeDialog } from '../../../ui/state/ui-slice';
import { setSelectedSnapById } from '../../state';

import useStyles from './styles';

export const SnapMoreAction = ({ id }) => {
  const dispatch = useDispatch();

  const anchorRef = useRef();

  const [isPopperOpen, togglePopper] = useToggle();

  const closePopper = () => togglePopper(false);

  const handleMoreClick = () => {
    togglePopper(true);
    dispatch(setSelectedSnapById(id));
  };

  const classes = useStyles();
  return (
    <>
      <IconButton ref={anchorRef} onClick={handleMoreClick}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Popper
        className={classes['snap-card-header-popper']}
        open={isPopperOpen}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={closePopper}>
                <MenuList onClick={closePopper}>
                  <SnapUpdateButton />
                  <SnapDeleteButton />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const SnapUpdateButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openDialog(DIALOGS.SNAP_UPDATE));
  };

  return (
    <MenuItem onClick={handleClick}>
      <Icon variant="h5" component={UpdateIcon} color="primary" />
    </MenuItem>
  );
};

const SnapDeleteButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeDialog()); //*** specifically for <SnapDialog>. Bit crap
    dispatch(openConfirmDialog(DIALOGS.SNAP_DELETE));
  };

  return (
    <MenuItem onClick={handleClick}>
      <Icon variant="h5" component={DeleteIcon} color="secondary" />
    </MenuItem>
  );
};
