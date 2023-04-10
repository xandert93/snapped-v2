import { Grid, useMediaQuery } from '@material-ui/core';
import { isVPMinMd } from '../../../../theme/media-queries';

import { Feed, HomeSuggestedSnapsCard } from '../../../snap/components';
import { HomeSuggestedUsersCard } from '../HomeSuggestedUsersCard';

import useStyles from './styles';

export const HomeContent = () => {
  const isMinMd = useMediaQuery(isVPMinMd);

  const classes = useStyles();

  return (
    <Grid container justifyContent="center" spacing={isMinMd ? 2 : 1}>
      <Grid
        className={classes['feed-container']} //
        item
        md={7}
        xs={12}>
        <Feed />
      </Grid>
      <Grid
        component="aside"
        className={classes['suggested-snaps-container']}
        item
        md={5}
        xs={12}
        container
        spacing={isMinMd ? 2 : 0}
        alignContent="flex-start">
        {isMinMd && (
          <Grid item xs={12}>
            <HomeSuggestedSnapsCard />
          </Grid>
        )}
        <Grid className={classes['suggested-users-container']} item xs={12}>
          <HomeSuggestedUsersCard />
        </Grid>
      </Grid>
    </Grid>
  );
};
