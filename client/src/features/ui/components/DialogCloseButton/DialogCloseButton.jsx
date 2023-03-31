import { Button } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../state/ui-slice';
import { selectIsRequesting } from '../../state/ui-selectors';

import { ResponsiveIconButton } from '../../../../components';

import useStyles from './styles';

//have to create copy of props object, since props are immutable
export const DialogCloseButton = ({ ...props }) => {
  const dispatch = useDispatch();

  props.disabled = useSelector(selectIsRequesting);
  if (!props.onClick) props.onClick = () => dispatch(closeDialog());

  if (props.children) return <Button color="primary" {...props} />;
  else return <ResponsiveIconButton color="inherit" size="h4" {...props} />;
};
