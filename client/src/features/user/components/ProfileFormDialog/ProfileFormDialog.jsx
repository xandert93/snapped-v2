import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { DialogCloseButton } from '../../../ui/components';
import { selectAuthUserProfile } from '../../state/user-selectors';

import { ProfileForm } from '../ProfileForm/ProfileForm';
import { selectIsRequesting } from '../../../ui/state/ui-selectors';
import { LoadingButton } from '../../../../components';
import { isEqual as areEqual } from 'lodash';

export const ProfileFormDialog = () => {
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

export const ProfileFormSubmitButton = ({ details }) => {
  const currentDetails = useSelector(selectAuthUserProfile);

  const isClean = areEqual(currentDetails, details);
  const isRequesting = useSelector(selectIsRequesting);

  return (
    <LoadingButton
      type="submit"
      form="profile-form"
      isLoading={isRequesting}
      disabled={isClean || isRequesting}
      color="secondary"
      children="Save"
    />
  );
};
