import { useDispatch, useSelector } from 'react-redux';

import { selectSelectedSnap } from '../../state';
import { updateSnap } from '../../state';
import { genImagePreviewURL } from '../../../../utils/cloudinary';
import { SnapForm } from '../SnapForm';

export const SnapUpdateForm = ({ ...props }) => {
  const dispatch = useDispatch();

  const { _id: id, imageIds, location, caption, tags, isPublic } = useSelector(selectSelectedSnap);

  props.previewURLs = imageIds.map((id) => genImagePreviewURL(id));
  props.initialBody = { location, caption, tags, isPublic };
  props.onSubmit = (update) => dispatch(updateSnap({ id, update, message: 'Updating Snap' }));

  return <SnapForm {...props} />;
};
