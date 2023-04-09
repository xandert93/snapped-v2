import useStyles from './styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmDialog } from '../../state/ui-slice';
import {
  selectConfirmDialogId,
  selectIsConfirmDialogOpen,
  selectIsRequesting,
} from '../../state/ui-selectors';

import { DIALOGS } from '../../../../constants/modal-constants';
import { logout } from '../../../auth/state/auth-actions';
import { deleteSnap } from '../../../snap/state';

import { DialogCloseButton } from '../DialogCloseButton';
import { deleteAuthUser, toggleFollow } from '../../../user/state/user-actions';
import { LoadingAlert, LoadingButton } from '../../../../components';

const { UNFOLLOW, SNAP_DELETE, ACCOUNT_DELETE, LOGOUT } = DIALOGS;

function getDialogData(dialogId, args) {
  switch (dialogId) {
    // case UNFOLLOW: {
    //   return {
    //     title: 'unfollow this account?',
    //     message: 'Their Snaps will no longer appear on your feed',
    //     choices: ['cancel', 'unfollow'],
    //     onConfirm: () => toggleFollow(args)
    //   };
    // }
    case SNAP_DELETE: {
      return {
        title: 'delete this Snap?',
        message: 'Your Snap will be permanenty deleted and cannot be recovered',
        choices: ['cancel', 'confirm'],
        onConfirm: deleteSnap,
        onConfirmText: 'Deleting snap...',
      };
    }
    case ACCOUNT_DELETE: {
      return {
        title: 'delete your account?',
        message: 'Your account will be permanently deleted and cannot be recovered',
        choices: ['cancel', 'confirm'],
        onConfirm: deleteAuthUser,
        onConfirmText: 'Deleting your account...',
      };
    }
    case LOGOUT: {
      return {
        title: 'logout?',
        message: 'You will be missed.',
        choices: ['no', 'yes'],
        onConfirm: logout,
        onConfirmText: 'Logging you out...',
      };
    }

    default:
      return { choices: [] }; //*** 1
  }
}

export const ConfirmDialog = (props) => {
  const dispatch = useDispatch();

  const dialogId = useSelector(selectConfirmDialogId);
  const isOpen = useSelector(selectIsConfirmDialogOpen);
  const isRequesting = useSelector(selectIsRequesting);

  const { title, message, choices, onConfirm, onConfirmText } = getDialogData(dialogId);

  const handleClose = () => (!isRequesting ? dispatch(closeConfirmDialog()) : null);
  const handleConfirm = () => dispatch(onConfirm());

  if (!dialogId) return null; //*** 2
  else
    return (
      <Dialog open={isOpen} onClose={handleClose} fullWidth={false}>
        {!isRequesting ? (
          <>
            <DialogTitle children={`Are you sure that you want to ${title}`} />
            <DialogContent children={<DialogContentText children={message} />} />
            <DialogActions>
              <DialogCloseButton onClick={handleClose} color="primary" children={choices[0]} />
              <LoadingButton
                onClick={handleConfirm}
                color="secondary"
                children={choices[1]}
                isLoading={isRequesting}
              />
            </DialogActions>
          </>
        ) : (
          <LoadingAlert text={onConfirmText} />
        )}
      </Dialog>
    );
};

/*
- I think all handleConfirm actions will be asynchronous...most of the time 

- I've withheld from doing `toggleFollow` confirmation, because it would 
  also need to update <FollowButton> local state. Not sure on that yet

1) so data can still be destructured...probably needs elegant fix

2) temporary fix. Otherwise when request ends, isRequesting => false and confirmation data 
   will show as dialog fades out, which looks shit
*/
