import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Grow, useMediaQuery } from '@material-ui/core';
import { CloudUploadRounded as UploadIcon, CheckRounded as CheckIcon } from '@material-ui/icons';

import { selectDialogId, selectIsDialogOpen, selectIsRequesting } from '../../state/ui-selectors';
import { closeDialog } from '../../state/ui-slice';

import { DIALOGS } from '../../../../constants/modal-constants';

import { ActivationDialog, EmailResetDialog, SessionExpiredDialog } from '../../../auth/components';

import { isVPXs } from '../../../../theme/media-queries';
import useStyles from './styles';

import {
  SnapCreateForm,
  SnapDialog,
  SnapUpdateForm,
  SnapFormDialog,
  SnapLikesDialog,
  SnapCreateDNDDialog,
} from '../../../snap/components';
import { SlideDown, SlideLeft } from '../../../../components';
import { WelcomeDialog, ProfileFormDialog } from '../../../user/components';

import { NotificationMenu } from '../../../notification/components';
import { markNotificationsAsSeen } from '../../../notification/state/notification-slice';

const {
  ACTIVATION,
  EMAIL_RESET,
  WELCOME,
  SNAP_CREATE_DND,
  SELECTED_SNAP,
  SNAP_LIKES,
  SNAP_CREATE,
  SNAP_UPDATE,
  PROFILE_UPDATE,
  NOTIFICATIONS,
  SESSION_EXPIRED,
} = DIALOGS;

export const DialogManager = () => {
  const DIALOG_ID = useSelector(selectDialogId);
  const isOpen = useSelector(selectIsDialogOpen);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) dispatch(closeDialog()); // in case modal is open when the page changes e.g. after clicking a <Link> within the modal
  }, [location]);

  const isXs = useMediaQuery(isVPXs);

  const isRequesting = useSelector(selectIsRequesting);

  const handleClose = () => dispatch(closeDialog());

  const responsiveProps = {
    maxWidth: 'sm', // "xs | sm* | md | lg | xl "
    fullScreen: isXs, //root <Paper> will take up 100% width and 100% height on xs screens
    TransitionComponent: isXs ? SlideLeft : Grow,
    transitionDuration: 400,
    ...(isRequesting && { onClose: null }),
  };

  let props = {};

  const classes = useStyles();
  switch (DIALOG_ID) {
    case ACTIVATION:
    case EMAIL_RESET:
      props = {
        className: classes['activation-dialog'],
        fullWidth: true, // takes full width of breakpoint specified by "maxWidth" prop
        TransitionComponent: Grow,
        children: DIALOG_ID === ACTIVATION ? <ActivationDialog /> : <EmailResetDialog />,
        ...(DIALOG_ID === EMAIL_RESET && { onClose: null }),
      };
      break;

    case WELCOME:
      props = {
        ...responsiveProps,
        children: <WelcomeDialog />,
      };
      break;
    case PROFILE_UPDATE:
      props = {
        ...responsiveProps,
        children: <ProfileFormDialog />,
      };
      break;

    case SELECTED_SNAP:
      props = {
        maxWidth: 'xl',
        fullWidth: false,
        fullScreen: isXs,
        TransitionComponent: !isXs ? SlideDown : SlideLeft,
        children: <SnapDialog />,
      };
      break;

    case SNAP_LIKES:
      props = {
        maxWidth: 'xs',
        fullScreen: isXs,
        TransitionComponent: !isXs ? SlideDown : SlideLeft,
        classes: { paper: classes['snap-likes-dialog-paper'] },
        children: <SnapLikesDialog />,
      };
      break;

    case SNAP_CREATE_DND:
      props = {
        children: <SnapCreateDNDDialog />,
        onDragOver: (e) => e.preventDefault(), //enable root <div> as a dropzone, so that contingency "onDrop" below can run
        onDragLeave: (e) => !e.relatedTarget && dispatch(closeDialog()),
        onDrop: (e) => {
          e.preventDefault(); //prevents opening of file in new tab
          dispatch(closeDialog());
        },
      };
      break;

    case SNAP_CREATE:
      props = {
        ...responsiveProps,
        children: (
          <SnapFormDialog
            FormComponent={SnapCreateForm}
            title="Create Your Snap!"
            SubmitIcon={UploadIcon}
          />
        ),
      };
      break;

    case SNAP_UPDATE:
      props = {
        ...responsiveProps,
        children: (
          <SnapFormDialog
            FormComponent={SnapUpdateForm}
            title="Edit Your Snap!"
            SubmitIcon={CheckIcon}
          />
        ),
      };
      break;
    case NOTIFICATIONS:
      const handleNotificationMenuOpen = () => dispatch(markNotificationsAsSeen());

      props = {
        fullScreen: true,
        children: <NotificationMenu />,
        TransitionComponent: SlideLeft,
        TransitionProps: {
          onEntering: handleNotificationMenuOpen,
        },
      };
      break;

    case SESSION_EXPIRED:
      props = {
        children: <SessionExpiredDialog />,
      };
      break;
  }

  return <Dialog open={isOpen} onClose={handleClose} {...props} />;
};

/*

By default, onDragLeave fires when the drag enters a child of the dropzone.
In this case, because the dropzone element (the root div[role="presentation"]) takes up the 
entire viewport, the only time the secondary target is falsy is when the viewport is exited. 
On this occasion, it will be "null". Thus, we have instructed the handler should only 
close the dialog if the secondary target is falsy.

<Dialog> outputs: div[role="presentation"] > div.MuiBackdrop , div.MuiDialog-container>div.MuiPaper-root > children

onClose=f --> fires when client requests Dialog closure e.g. "esc" keydown || "backdrop" click. We want this to be blocked if isRequesting

<Dialog> also accepts "TransitionProps":

TransitionProps: {
  onExit: () => console.log('onExit'),
  onEnter: () => console.log('onEnter'),
  onExited: () => console.log('onExited'),
  onEntered: () => console.log('onEntered'),
  onEntering: () => console.log('onEntering'),
  onExiting: () => console.log('onExiting'),
},

*/
