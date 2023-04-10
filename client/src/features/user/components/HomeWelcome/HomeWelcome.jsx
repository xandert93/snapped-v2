import { Box, Card, Divider, Typography } from '@material-ui/core';
import { SuggestedUsers } from '../SuggestedUsers';
import { FlexBox } from '../../../../components';

import useStyles from './styles';

export const HomeWelcome = () => {
  const classes = useStyles();

  return (
    <Card
      className={classes['welcome-card']}
      elevation={8}
      component={FlexBox}
      direction="column"
      gap={2}>
      <Greeting />
      <Divider />
      <Box className={classes['suggested-users-container']}>
        <SuggestedUsers count={10} />
      </Box>
    </Card>
  );
};

const Greeting = () => {
  return (
    <FlexBox gap={2}>
      <Typography component="h2" variant="h5">
        Welcome to your timeline! 👋
      </Typography>
      <Typography>This is the best place to see what's going down on Snapped!</Typography>
      <Typography>The more people you follow, the better your timeline becomes 😉</Typography>
      <Typography>To get started, follow someone from below or post your first Snap! 😄</Typography>
    </FlexBox>
  );
};
