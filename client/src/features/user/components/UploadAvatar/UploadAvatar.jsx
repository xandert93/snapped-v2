import { AuthUserAvatar } from '../AuthUserAvatar';
import { CircularButtonBase, Tooltip } from '../../../../components';

import { UpdateAvatarInput } from '../UpdateAvatarInput';

export const UploadAvatar = () => {
  return (
    <Tooltip title="Add a profile picture" placement="right">
      <CircularButtonBase>
        <AuthUserAvatar fontSize={60} border />
        <UpdateAvatarInput />
      </CircularButtonBase>
    </Tooltip>
  );
};
