import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { ProfileRelationDialog } from '../../ProfileRelationDialog';

import useStyles from './styles';

export const ProfileHeaderActivity = ({ snapCount, followerCount, followCount, type }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const handleClick = (tabName) => () => {
    history.push(`${url}/${tabName}`);
  };

  const classes = useStyles();
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={4} container direction="column" alignItems="center">
          <Typography className={classes['activity-counter']}>snaps</Typography>
          <Typography>{snapCount}</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="column"
          component={ButtonBase}
          onClick={handleClick('followers')}
          style={{ borderRadius: 4 }}>
          <Typography className={classes['activity-counter']}>followers</Typography>
          <Typography>{followerCount}</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="column"
          component={ButtonBase}
          onClick={handleClick('following')}
          style={{ borderRadius: 4 }}>
          <Typography className={classes['activity-counter']}>following</Typography>
          <Typography>{followCount}</Typography>
        </Grid>
      </Grid>

      <Route
        path={path + '/:type'}
        children={(routeProps) => (
          <ProfileRelationDialog parentUrl={url} type={type} isAuthProfile />
        )}
      />
    </>
  );
};
