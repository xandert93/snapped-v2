import { Grid } from '@material-ui/core';

import useStyles from './styles';

//where props include <form> attrs e.g. "id" || "autoComplete" || "spellCheck" etc.
//                    Grid container props e.g. "justifyContent" || "alignItems" || "spacing" etc.

export const GridForm = ({ onSubmit, children, ...props }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      spacing={2}
      component="form"
      autoComplete="off"
      spellCheck="false"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      {...props}>
      {children}
    </Grid>
  );
};
