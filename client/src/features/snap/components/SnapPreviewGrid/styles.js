import { makeStyles, alpha } from '@material-ui/core';

export default makeStyles((theme) => ({
  'snap-previews-skeleton': {
    flexGrow: 1, // 1
  },
}));

/*
1) having to do this manually since <Grid item xs={12}> is producing horizontal overflow
*/
