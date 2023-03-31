import { Slide } from '@material-ui/core';
import { forwardRef } from 'react';

export const SlideDown = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
