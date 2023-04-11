import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'gradient-typography': ({ degs, color1, color2 }) => ({
    backgroundImage: `linear-gradient(${degs}, ${color1}, ${color2})`,
    color: 'transparent',
    '-webkit-background-clip': 'text',
  }),
}));
