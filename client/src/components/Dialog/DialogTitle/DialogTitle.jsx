import { Typography } from '@material-ui/core';

import useStyles from './styles';

export const DialogTitle = (props) => {
  const classes = useStyles();

  return <Typography variant="h5" component="h2" {...props} />;
};

//DialogTitle --> <div><h2>{children}
