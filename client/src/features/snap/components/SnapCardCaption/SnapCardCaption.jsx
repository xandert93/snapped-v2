import { CardContent, Typography } from '@material-ui/core';

import { useSnap } from '../../context';

import useStyles from './styles';

export const SnapCardCaption = () => {
  const { caption } = useSnap();

  const classes = useStyles();
  return (
    <CardContent>
      <Typography className={classes['snap-card-caption']} variant="body1" children={caption} />
    </CardContent>
  );
};
