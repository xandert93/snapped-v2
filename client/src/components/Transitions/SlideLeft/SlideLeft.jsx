import { Slide } from '@material-ui/core';
import { forwardRef } from 'react';

export const SlideLeft = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});
