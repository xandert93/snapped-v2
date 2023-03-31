import { CardHeader } from '@material-ui/core';

import { useSelector } from 'react-redux';

import { selectIsAuthUsersSnap } from '../../state';

import useStyles from './styles';

import { SnapCardHeaderTitle } from '../SnapCardHeaderTitle';
import { SnapMoreAction } from '../SnapMoreAction';
import { SnapCardHeaderAvatar } from '../SnapCardHeaderAvatar';
import { useSnap } from '../../context';

export const SnapCardHeader = () => {
  const { _id, location, creator } = useSnap();

  const isUsersSnap = useSelector(selectIsAuthUsersSnap(creator._id));

  return (
    <CardHeader
      avatar={<SnapCardHeaderAvatar />}
      title={<SnapCardHeaderTitle />}
      titleTypographyProps={{ variant: 'body1' }}
      subheader={location}
      subheaderTypographyProps={{ variant: 'subtitle2' }}
      action={isUsersSnap && <SnapMoreAction id={_id} />}
    />
  );
};
