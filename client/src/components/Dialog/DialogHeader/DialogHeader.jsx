import { AppBar, Toolbar } from '@material-ui/core';
import { GradientAppBar } from '../../Layouts';

import useStyles from './styles';

export const DialogHeader = ({ children }) => {
  const classes = useStyles();

  return (
    <GradientAppBar position="sticky">
      <Toolbar className={classes['dialog-header-content']}>{children}</Toolbar>
    </GradientAppBar>
  );
};

/*
Toolbar is good here since it outputs a Flex container that has padding applied and is basically ready
for multiple UI elements to be placed in row e.g. button, h2, button. This cannot be said of a 
<DialogTitle>, which is only concerned with outputting a <div><h2>...

Since the Toolbar applies a 56px || 64px height, the title should be a <Typography> and not <DialogTitle> 
as the latter will add even more spacing with unnecessary padding.
*/
