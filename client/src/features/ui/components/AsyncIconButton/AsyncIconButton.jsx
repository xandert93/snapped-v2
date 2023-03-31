import { useSelector } from 'react-redux';

import { selectIsRequesting } from '../../state/ui-selectors';
import useStyles from './styles';
import { ResponsiveIconButton } from '../../../../components';
import { CircularProgress } from '@material-ui/core';

export const AsyncIconButton = (props) => {
  const isRequesting = useSelector(selectIsRequesting);

  const classes = useStyles();
  return !isRequesting ? (
    <ResponsiveIconButton color="inherit" {...props} />
  ) : (
    <CircularProgress size="1.7em" />
  );
};
