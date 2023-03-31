import { useScrollTrigger } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useUpdateEffect } from '../../../../hooks';
import { toggleScrollDown } from '../../state/ui-slice';

export const ScrollListener = () => {
  const isScrolledDown = useScrollTrigger({ target: window, threshold: 100 });
  const dispatch = useDispatch();

  useUpdateEffect(() => {
    dispatch(toggleScrollDown());
  }, [isScrolledDown]);

  return null;
};
