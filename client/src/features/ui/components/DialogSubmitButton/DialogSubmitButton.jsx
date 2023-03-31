import useStyles from './styles';

import { ConnectedLoadingButton } from '../ConnectedLoadingButton';
import { AsyncIconButton } from '../AsyncIconButton';

export const DialogSubmitButton = (props) => {
  if (props.children) return <ConnectedLoadingButton type="submit" color="secondary" {...props} />;
  else return <AsyncIconButton type="submit" size="h4" {...props} />;
};
