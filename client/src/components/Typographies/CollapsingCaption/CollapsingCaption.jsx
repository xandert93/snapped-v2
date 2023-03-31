import { Collapse, Fade, Typography } from '@material-ui/core';

import useStyles from './styles';

export const CollapsingCaption = (props) => {
  const classes = useStyles();
  return (
    <Collapse in={props.in} timeout={500} unmountOnExit>
      <Fade in={props.in} timeout={{ enter: 800 }}>
        <Typography
          className={classes.caption}
          variant="caption"
          component="p"
          children={props.text}
        />
      </Fade>
    </Collapse>
  );
};
