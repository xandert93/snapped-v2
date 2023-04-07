import { DialogContent, DialogContentText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAuthUserFirstName } from '../../state/user-selectors';

import { UploadAvatar } from '..';
import { CenteredGrid, DialogHeader, DialogTitle } from '../../../../components';

import { ProfileFormDialog } from '../ProfileFormDialog';

export const WelcomeDialog = () => {
  const firstName = useSelector(selectAuthUserFirstName);

  return (
    <>
      <DialogHeader>
        <DialogTitle children="Welcome to snapped!" />
      </DialogHeader>
      <DialogContent style={{ flex: 'initial' }}>
        <DialogContentText children={`Hi, ${firstName}! We see that you're new here!`} />
        <CenteredGrid>
          <UploadAvatar />
        </CenteredGrid>
      </DialogContent>

      <ProfileFormDialog />
    </>
  );
};

//DialogTitle outputs a <div><h2>{title}<h2></div>
//DialogContent outputs a scrollable <div>
//DialogContentText outputs a <p> body1. Inherits from "<Typography>" --> can use their props too!
//DialogActions are separate from <DC>...never scrolled.
