import { useSelector } from 'react-redux';
import { selectIsRequesting } from '../../../ui/state/ui-selectors';
import { selectAuthUserProfile } from '../../state/user-selectors';

import { isEqual as areEqual } from 'lodash';

import useStyles from './styles';
import { LoadingButton } from '../../../../components';

export const ProfileFormSubmitButton = ({ details }) => {
  const currentDetails = useSelector(selectAuthUserProfile);

  const isClean = areEqual(currentDetails, details);
  const isRequesting = useSelector(selectIsRequesting);

  const classes = useStyles();
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
