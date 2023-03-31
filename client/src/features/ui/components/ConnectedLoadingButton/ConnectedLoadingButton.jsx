import { useSelector } from 'react-redux';

import { selectIsRequesting } from '../../state/ui-selectors';
import { LoadingButton } from '../../../../components';

export const ConnectedLoadingButton = (props) => {
  const isRequesting = useSelector(selectIsRequesting);

  return <LoadingButton isLoading={isRequesting} {...props} />;
};
