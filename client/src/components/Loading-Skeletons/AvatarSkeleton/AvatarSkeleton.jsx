import { Avatar } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import useStyles from './styles';

export const AvatarSkeleton = () => {
  return (
    <Skeleton variant="circle">
      <Avatar />
    </Skeleton>
  );
};
