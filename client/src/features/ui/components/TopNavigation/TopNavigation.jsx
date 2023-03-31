import { AppBar, Grid, Slide, Toolbar } from '@material-ui/core';
import { isVPMaxMd, isVPMinMd } from '../../../../theme/media-queries';

import { useSelector } from 'react-redux';

import { SideNavigationButton } from './SideNavigationButton';
import { TopNavigationHomeLink } from './TopNavigationHomeLink';
import { TopNavigationActions } from './TopNavigationActions';
import { TopNavigationSearchBar } from './TopNavigationSearchBar';

import useStyles from './styles';
import { selectIsScrolledDown } from '../../state/ui-selectors';
import { useMediaQueries } from '../../../../hooks';

export const TopNavigation = () => {
  const isScrolledDown = useSelector(selectIsScrolledDown);

  const classes = useStyles();
  return (
    <>
      <Slide appear={false} in={!isScrolledDown} timeout={{ enter: 250, exit: 500 }}>
        <AppBar className={classes['app-bar']} color="inherit">
          <Toolbar
            className={classes.toolbar}
            component={Grid}
            container
            justifyContent="space-between">
            <TopNavigationContent />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar className={classes['top-navigation-spacer']} />
    </>
  );
};

const TopNavigationContent = () => {
  const [isMinMd, isMaxMd] = useMediaQueries(isVPMinMd, isVPMaxMd);

  return (
    <>
      <Grid item xs={6} md={3} lg container wrap="nowrap">
        {isMaxMd && <SideNavigationButton />}
        <TopNavigationHomeLink />
      </Grid>

      {isMinMd && (
        <Grid item md={6} lg>
          <TopNavigationSearchBar />
        </Grid>
      )}

      <Grid
        item
        xs={6}
        md={3}
        lg
        container
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}>
        <TopNavigationActions />
      </Grid>
    </>
  );
};
