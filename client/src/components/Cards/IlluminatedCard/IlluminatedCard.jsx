import { Card } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './styles';

export const IlluminatedCard = ({ className, ...props }) => {
  const classes = useStyles();
  return <Card className={clsx(classes['illuminated-card'], className)} {...props} />;
};
