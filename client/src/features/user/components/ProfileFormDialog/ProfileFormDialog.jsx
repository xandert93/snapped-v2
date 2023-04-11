import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import { DialogCloseButton } from '../../../ui/components';
import { selectAuthUserProfile } from '../../state/user-selectors';

import { ProfileForm } from '../ProfileForm/ProfileForm';
import { selectIsRequesting } from '../../../ui/state/ui-selectors';
import { LoadingButton } from '../../../../components';
import { isEqual as areEqual } from 'lodash';

export const ProfileFormDialog = () => {
  return (
    <DialogContent>
      <ProfileDialogContent />
    </DialogContent>
  );
};

export const ProfileDialogContent = () => {
  const initialDetails = useSelector(selectAuthUserProfile);
  const [details, setDetails] = useState(initialDetails);

  return (
    <>
      <DialogContentText component="h3" children="Tell folks more about yourself:" />
      <ProfileForm details={details} setDetails={setDetails} />
      <DialogActions>
        <DialogCloseButton children="Cancel" />
        <ProfileFormSubmitButton details={details} />
      </DialogActions>
    </>
  );
};

const ProfileFormSubmitButton = ({ details }) => {
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
