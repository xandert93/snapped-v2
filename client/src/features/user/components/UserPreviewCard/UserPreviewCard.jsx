import { CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { CldAvatar } from '../../../../components';
import { genProfilePath } from '../../../../utils/routing-utils';
import { FollowButton } from '../FollowButton';
import { ProfileLink } from '../ProfileLink';

import useStyles from './styles';

export const UserPreviewCard = ({
  _id: userId,
  avatarId,
  firstName,
  lastName,
  username,
  isFollowed = false, // not provided by <SuggestedUserList>, for example (since all are implicitly `false`)
  watchUser, // provided for infinite scroll components
}) => {
  const history = useHistory();

  const initials = firstName[0] + lastName[0];
  const fullName = firstName + ' ' + lastName;

  const handleClick = () => {
    history.push(genProfilePath(username));
  };

  const classes = useStyles();
  return (
    <CardHeader
      onClick={handleClick}
      className={classes['user-preview-card']}
      classes={{ content: classes['user-preview-card-content'] }}
      avatar={
        <CldAvatar
          className={classes['user-preview-card-avatar']}
          variant="circular"
          srcId={avatarId}
          children={initials}
        />
      }
      title={username}
      titleTypographyProps={{
        variant: 'body2',
        noWrap: true,
        component: ProfileLink,
        id: userId,
        username,
        onClick: (e) => e.stopPropagation(), // so handleClick doesn't fire too, resulting in 2x push
      }}
      subheader={fullName}
      subheaderTypographyProps={{ variant: 'body2', noWrap: true }}
      action={<FollowButton userId={userId} isFollowed={isFollowed} stopPropagation />}
      ref={watchUser}
    />
  );
};
