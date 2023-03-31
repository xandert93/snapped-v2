import { Avatar } from '@material-ui/core';
import { forwardRef } from 'react';
import { genAvatarURL } from '../../utils/cloudinary';

export const CldAvatar = forwardRef(({ srcId, ...props }, ref) => {
  return <Avatar ref={ref} src={genAvatarURL(srcId)} {...props} />;
});

/*
1) <Tooltip> expects to pass a ref to it
*/
