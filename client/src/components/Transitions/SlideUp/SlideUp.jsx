import { Slide } from '@material-ui/core';
import { forwardRef } from 'react';

export const SlideUp = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
