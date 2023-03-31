import { CardContent, Typography } from '@material-ui/core';
import { IlluminatedCard, Link } from '../../../../components';
import { SuggestedUsers } from '../SuggestedUsers';

import useStyles from './styles';

export const HomeSuggestedUsersCard = () => {
  const classes = useStyles();
  return (
    <IlluminatedCard className={classes['suggested-users-card']}>
      <SuggestedUsers count={3} />
      <CardContent>
        <Typography
          variant="body2"
          component={Link}
          /* to="/explore/people" */ children="View more"
        />
      </CardContent>
    </IlluminatedCard>
  );
};
