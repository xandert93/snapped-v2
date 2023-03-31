import { Grid, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { useSetDocumentTitle } from '../../hooks';

import {
  Feed,
  SnapCreateDNDDialog,
  SnapCreateFAB,
  SocketSnapsButton,
  HomeSuggestedSnapsCard,
} from '../../features/snap/components';
import { HomeSuggestedUsersCard, HomeWelcome } from '../../features/user/components';

import { DIALOGS } from '../../constants/modal-constants';
import { openDialog } from '../../features/ui/state/ui-slice';

import useStyles from './styles';

import { isVPMinMd } from '../../theme/media-queries';
import { selectShowHomeGreeting } from '../../features/user/state/user-selectors';
import { Main } from '../../components';

export const HomePage = () => {
  useSetDocumentTitle('Home');

  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault(); // makes <Main> a valid drop target
    dispatch(openDialog(DIALOGS.SNAP_CREATE_DND)); // could use local `isOpen` state here and pass as props, but then entire <Home> would re-render on drag interaction
  };

  const showHomeGreeting = useSelector(selectShowHomeGreeting);

  return (
    <>
      <SocketSnapsButton />
      <Main onDragOver={handleDragOver}>
        {showHomeGreeting ? <HomeWelcome /> : <HomeContent />}
      </Main>
      <SnapCreateDNDDialog />
      <SnapCreateFAB />
    </>
  );
};

const HomeContent = () => {
  const isMinMd = useMediaQuery(isVPMinMd);

  const classes = useStyles();
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        className={classes['feed-container']} //
        item
        xs={12}
        md={7}>
        <Feed />
      </Grid>
      <Grid
        component="aside"
        className={classes['suggestions-container']}
        item
        xs={12}
        md={5}
        container
        spacing={2}
        alignContent="flex-start">
        {isMinMd && (
          <Grid item xs={12}>
            <HomeSuggestedSnapsCard />
          </Grid>
        )}
        <Grid item xs={12}>
          <HomeSuggestedUsersCard />
        </Grid>
      </Grid>
    </Grid>
  );
};
