import { useSelector } from 'react-redux';
import { SNAPS } from '../../constants/blog-constants';
import { selectAuthUser } from '../../../user/state/user-selectors';
import ProfileHeader from './ProfileHeader';
import ProfileSnapGrid from './ProfileSnapGrid';

export default function UserProfile() {
  const user = useSelector(selectAuthUser);
  return (
    <>
      <ProfileHeader profile={user} isUser />
      <ProfileSnapGrid type={SNAPS.USER} isUser />
    </>
  );
}
