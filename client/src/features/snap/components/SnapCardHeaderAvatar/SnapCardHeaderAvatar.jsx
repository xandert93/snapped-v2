import useStyles from './styles';

import { CldAvatar } from '../../../../components';

import { ProfileLink } from '../../../user/components';
import { useSnap } from '../../context';

export const SnapCardHeaderAvatar = () => {
  const { _id: creatorId, avatarId, username } = useSnap().creator;

  const classes = useStyles();
  return (
    <ProfileLink id={creatorId} username={username}>
      <CldAvatar
        className={classes['snap-card-header-avatar']}
        srcId={avatarId}
        alt={username[0]}
      />
    </ProfileLink>
  );
};

// const ProfileLinkAvatar = (props) => {
//   return (
//     <ProfileLink
//       id={id}
//       username={username}
//       children={
//         <CldAvatar //
//           srcId={avatarId}
//           alt={`${username}'s profile picture`}
//           children={username[0]}
//         />
//       }
//     />
//   );
// };

/*
src invalid ? will use children text as fallback. Convention to make it a singular letter
no "children" text provided? uses the first letter of the "alt" prop value as fallback.

if src cannot be read from at all e.g. anything but some kind of truthy String, 
the "alt" prop value is not used and instead "children" fallback needed

if no "children" fallback provided, generic SVG avatar used
*/
