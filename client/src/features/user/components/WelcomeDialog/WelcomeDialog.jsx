import { DialogContent, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAuthUserFirstName } from '../../state/user-selectors';

import { UploadAvatar } from '..';
import { DialogHeader, DialogTitle } from '../../../../components';

import { ProfileDialogContent } from '../ProfileFormDialog';

export const WelcomeDialog = () => {
  const firstName = useSelector(selectAuthUserFirstName);

  return (
    <>
      <DialogHeader>
        <DialogTitle children="Welcome to snapped!" />
      </DialogHeader>
      <DialogContent>
        <Grid container direction="column" style={{ gap: 16 }}>
          <Typography children={`Hi, ${firstName}! We see that you're new here!`} />
          <UploadAvatar style={{ alignSelf: 'center' }} />
          <ProfileDialogContent />
        </Grid>
      </DialogContent>
    </>
  );
};

//DialogTitle outputs a <div><h2>{title}<h2></div>
//DialogContent outputs a scrollable <div>
//DialogContentText outputs a <p> body1. Inherits from "<Typography>" --> can use their props too!
//DialogActions are separate from <DC>...never scrolled.
