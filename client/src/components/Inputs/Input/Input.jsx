import { Grid, TextField } from '@material-ui/core';
import { forwardRef } from 'react';

//props will contain all the usual MUI TextField props
export const Input = forwardRef(({ halve, ...props }, ref) => {
  return (
    <Grid item xs={12} sm={halve ? 6 : 12}>
      <TextField inputRef={ref} {...props} />
    </Grid>
  );
});

/*
1) inputRef is a bespoke prop from MUI that allows us to pass a ref to the root <input>.
This serves as a convenience prop over manually writing inputProps={{ ref }} 

2) May want to consider customising the following <TextField> props:

- margin - adjusts vertical spacing
*/
