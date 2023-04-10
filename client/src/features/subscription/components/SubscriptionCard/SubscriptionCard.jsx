import { Card } from '@material-ui/core';
import { CenteredGrid } from '../../../../components';

import useStyles from './styles';

export const SubscriptionCard = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={classes['subscription-card']}
      elevation={8}
      component={CenteredGrid}
      direction="column"
      {...props}
    />
  );
};
