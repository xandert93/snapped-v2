import { Grid, Typography } from '@material-ui/core';
import { Link } from '../../../../components';
import useStyles from './styles';

export const AuthLinks = ({ links }) => {
  const classes = useStyles();

  return (
    <Grid item container justifyContent="center">
      {links.map(({ pretext, href, text }) => (
        <Typography key={pretext}>
          {pretext} <Link className={classes['auth-link']} to={href} children={text} />
        </Typography>
      ))}
    </Grid>
  );
};
