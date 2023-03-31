import { useDispatch } from 'react-redux';
import { CldThumb } from '../../../../components';
import { openSnapDialog } from '../../../ui/state/ui-actions';

import useStyles from './styles';

export const SnapPreviewImage = ({ snap, hover }) => {
  const dispatch = useDispatch();

  const handleImageClick = () => dispatch(openSnapDialog(snap));

  const classes = useStyles({ hover });
  return (
    <CldThumb
      srcId={snap.imageIds[0]}
      className={classes['snap-preview-image']}
      onClick={handleImageClick}
    />
  );
};
