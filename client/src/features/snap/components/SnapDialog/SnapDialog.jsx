import { Grid, useMediaQuery } from '@material-ui/core';

import { SnapDialogCard, SnapDialogMedia } from '../../components';

import useStyles from './styles';
import { isVPMinMd } from '../../../../theme/media-queries';

export const SnapDialog = () => {
  const classes = useStyles();
  const isMinMd = useMediaQuery(isVPMinMd);

  return (
    <Grid container className={classes['snap-dialog-content']} wrap="nowrap">
      {isMinMd && <SnapDialogMedia />}
      <Grid item xs={12} md container className={classes['dialog-snap-card']} direction="column">
        <SnapDialogCard />
      </Grid>
    </Grid>
  );
};
