import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'agreements-box': {
    textAlign: 'left', //otherwise "center" inherited from <AuthPaper/>

    '& .MuiCheckbox-root': {
      // paddingRight: theme.spacing(2),
    },

    '& .MuiFormControlLabel-root': {
      // marginLeft: 0, //*-11px
      // marginRight: 0, //16px
    },
  },
}));
