import { useDispatch, useSelector } from 'react-redux';

import { ImageFileInput, Icon, CameraIcon } from '../../../../components';

import { selectIsSnapPosting, handleSnapFileSelection } from '../../state';
import { ScrollableFAB } from '../../../ui/components';

import useStyles from './styles';

export const SnapCreateFAB = () => {
  const dispatch = useDispatch();

  const handleFileChange = (e) => dispatch(handleSnapFileSelection(e.target.files));

  const isPosting = useSelector(selectIsSnapPosting);

  const classes = useStyles();
  return (
    !isPosting && (
      <ScrollableFAB title="Create a Snap!" color="primary">
        <ImageFileInput id="snap-create-input" onChange={handleFileChange} multiple hidden />
        <Icon variant="h4" component={CameraIcon} className={classes['snap-create-icon']} />
      </ScrollableFAB>
    )
  );
};
