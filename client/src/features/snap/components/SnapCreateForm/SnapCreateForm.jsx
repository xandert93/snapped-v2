import { useDispatch, useSelector } from 'react-redux';
import { selectSnapImagePreviewURLs } from '../../state';
import { openSnapUploader } from '../../state';
import { SnapForm } from '../SnapForm';

const defaultBody = {
  location: '',
  caption: '',
  tags: [],
  isPublic: true,
};

export const SnapCreateForm = ({ ...props }) => {
  const dispatch = useDispatch();

  props.previewURLs = useSelector(selectSnapImagePreviewURLs);
  props.initialBody = defaultBody;
  props.onSubmit = (body) => dispatch(openSnapUploader(body));

  return <SnapForm {...props} />;
};
