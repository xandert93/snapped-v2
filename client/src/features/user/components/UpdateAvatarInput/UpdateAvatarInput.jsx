import { useDispatch } from 'react-redux';
import { ImageFileInput } from '../../../../components';
import { updateAvatar } from '../../state/user-actions';

export const UpdateAvatarInput = () => {
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(updateAvatar({ file, message: 'Updating your profile picture' }));
  };

  return <ImageFileInput id="update-avatar-input" onChange={handleFileChange} hidden />;
};
