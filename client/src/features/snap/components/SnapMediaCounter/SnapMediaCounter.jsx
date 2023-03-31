import { Typography } from '@material-ui/core';

import useStyles from './styles';

export const SnapMediaCounter = ({ value, total }) => {
  const classes = useStyles();
  return (
    <Typography className={classes['snap-media-counter']} variant="body2">
      {value} / {total}
    </Typography>
  );
};
