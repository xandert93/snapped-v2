import { CldAvatar } from '../../../../components';

import clsx from 'clsx';

import useStyles from './styles';

export const ProfileAvatar = ({ className, srcId, ...props }) => {
  const classes = useStyles();
  return (
    <CldAvatar className={clsx(className, classes['profile-avatar'])} srcId={srcId} {...props} />
  );
};
