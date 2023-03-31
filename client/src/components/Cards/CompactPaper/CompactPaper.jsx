import { Paper } from '@material-ui/core';

import clsx from 'clsx';

import useStyles from './styles';

export const CompactPaper = ({ className, ...props }) => {
  const classes = useStyles();

  return <Paper className={clsx(className, classes['compact-paper'])} {...props} />;
};
