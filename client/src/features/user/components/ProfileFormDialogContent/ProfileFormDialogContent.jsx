import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { DialogCloseButton } from '../../../ui/components';
import { selectAuthUserProfile } from '../../state/user-selectors';

import { ProfileFormSubmitButton } from '../ProfileFormSubmitButton';
import { ProfileForm } from '../ProfileForm/ProfileForm';

export const ProfileFormDialogContent = () => {
  const initialDetails = useSelector(selectAuthUserProfile);
  const [details, setDetails] = useState(initialDetails);

  return (
    <>
      <DialogContent>
        <Box mb={3}>
          <DialogContentText component="h3" children="Tell folks more about yourself:" />
        </Box>
        <ProfileForm details={details} setDetails={setDetails} />
      </DialogContent>
      <DialogActions>
        <DialogCloseButton children="Cancel" />
        <ProfileFormSubmitButton details={details} />
      </DialogActions>
    </>
  );
};
