import { useSelector } from 'react-redux';
import { useSetDocumentTitle } from '../../hooks';

import { SnapCreateFAB, SocketSnapsButton, SnapCreateMain } from '../../features/snap/components';
import { HomeWelcome, HomeContent } from '../../features/user/components';

import { selectShowHomeGreeting } from '../../features/user/state/user-selectors';

import useStyles from './styles';

export const HomePage = () => {
  useSetDocumentTitle('Home');

  const showHomeGreeting = useSelector(selectShowHomeGreeting);

  const classes = useStyles();
  return (
    <>
      <SocketSnapsButton />
      <SnapCreateMain className={classes['home-page']}>
        {showHomeGreeting ? <HomeWelcome /> : <HomeContent />}
      </SnapCreateMain>
      <SnapCreateFAB />
    </>
  );
};
