import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette }) => ({
  'avatar-actions': {
    width: 'initial', //
    position: 'absolute', // parent <Dialog>'s paper is already { position: relative }
    top: 10,
    right: 10,
  },
}));
