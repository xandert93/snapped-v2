import { LinearProgress as MuiLinearProgress } from '@material-ui/core';

import useStyles from './styles';

export const RoundedLinearProgress = ({ height, showLabel, ...props }) => {
  const classes = useStyles({ height });

  props.classes = {
    root: classes['progress-track'],
    bar: classes['progress-indicator'],
  };

  return <MuiLinearProgress {...props} />;
};
