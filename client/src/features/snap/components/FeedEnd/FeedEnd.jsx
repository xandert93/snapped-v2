import { Grid, Typography, Fade } from '@material-ui/core';
import { useRef } from 'react';
import { Link, Icon, CheckIcon } from '../../../../components';

import { useIsInVP } from '../../../../hooks';

import useStyles from './styles';

export const FeedEnd = () => {
  const classes = useStyles();

  const feedEndRef = useRef();
  const isVisible = useIsInVP(feedEndRef);

  return (
    <Fade in={isVisible} timeout={{ enter: 1200, exit: 0 }}>
      <Grid ref={feedEndRef} item container direction="column" alignItems="center">
        <Typography variant="h6" component="p" color="textSecondary">
          You're all caught up{' '}
          <Icon className={classes['check-icon']} variant="h5" component={CheckIcon} />
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Follow{' '}
          <Link underline="hover" to="/explore/people">
            more people
          </Link>{' '}
          to see more!
        </Typography>
      </Grid>
    </Fade>
  );
};
