import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core';

import useStyles from './styles';
import { forwardRef } from 'react';

// props => { children, to, ref? }
export const Link = forwardRef((props, ref) => (
  <MuiLink ref={ref} component={RouterLink} {...props} />
));

/* 
I have often provided Link as a `component` prop for native MUI components
e.g. <Chip component={Link}> etc. Many native MUI components insist on set a `ref`
on their top-level element and thus, we need to accomodate for that possibility here. 

*/
