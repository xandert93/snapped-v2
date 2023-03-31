import { Tooltip as MuiTooltip, Zoom } from '@material-ui/core';

import useStyles from './styles';

export const Tooltip = (props) => {
  const classes = useStyles();

  return (
    <MuiTooltip
      classes={{ tooltip: classes.tooltip, arrow: classes['tooltip-arrow'] }}
      TransitionComponent={Zoom} // Grow*
      // TransitionProps={{ timeout: { exit: 150 } }}
      arrow
      {...props}
    />
  );
};
