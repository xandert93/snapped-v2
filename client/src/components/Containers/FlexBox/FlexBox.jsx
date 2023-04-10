import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';

export const FlexBox = ({ className, gap, ...props }) => {
  const classes = useStyles({ gap });

  return <Grid container className={clsx(className, classes['flex-box'])} {...props} />;
};
