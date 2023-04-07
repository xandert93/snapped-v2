import { Grid, useMediaQuery } from '@material-ui/core';
import { isVPMinMd } from '../../../../theme/media-queries';

import { Feed, HomeSuggestedSnapsCard } from '../../../snap/components';
import { HomeSuggestedUsersCard } from '../HomeSuggestedUsersCard';

import useStyles from './styles';

export const HomeContent = () => {
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
