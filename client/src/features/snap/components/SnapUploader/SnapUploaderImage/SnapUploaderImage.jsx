import { useSelector } from 'react-redux';
import { selectFirstSnapImagePreviewURL } from '../../../state';

import useStyles from './styles';

export const SnapUploaderImage = () => {
  const url = useSelector(selectFirstSnapImagePreviewURL);

  const classes = useStyles();
  return <img className={classes['snap-uploader-image']} src={url} />;
};
