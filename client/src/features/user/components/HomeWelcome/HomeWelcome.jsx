import { Card, Divider, Grid, Typography } from '@material-ui/core';
import { SuggestedUsers } from '../SuggestedUsers';
import useStyles from './styles';

export const HomeWelcome = () => {
  const classes = useStyles();
  return (
    <Card className={classes['greeting-card']}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography component="h2" variant="h5" style={{ fontWeight: 'bold' }} paragraph>
            Welcome to your timeline! 👋
          </Typography>
          <Typography paragraph>
            This is the best place to see what's going down on Snapped!
          </Typography>
          <Typography paragraph>
            The more people you follow, the better your timeline becomes 😉
          </Typography>
          <Typography paragraph>
            To get started, follow someone from our suggestions or post your first Snap! 😄
          </Typography>
        </Grid>

        <Grid item>
          <Divider />
        </Grid>

        <Grid item className={classes['suggested-users-container']}>
          <SuggestedUsers count={10} />
        </Grid>
      </Grid>
    </Card>
  );
};
