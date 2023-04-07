import { useSelector } from 'react-redux';
import { useSetDocumentTitle } from '../../hooks';

import { SnapCreateFAB, SocketSnapsButton, SnapCreateMain } from '../../features/snap/components';
import { HomeWelcome, HomeContent } from '../../features/user/components';

import { selectShowHomeGreeting } from '../../features/user/state/user-selectors';

export const HomePage = () => {
  useSetDocumentTitle('Home');

  const showHomeGreeting = useSelector(selectShowHomeGreeting);

  return (
    <>
      <SocketSnapsButton />
      <SnapCreateMain>{showHomeGreeting ? <HomeWelcome /> : <HomeContent />}</SnapCreateMain>
      <SnapCreateFAB />
    </>
  );
};
