import { useSelector } from 'react-redux';
import { LoadingText } from '../../../../components';
import { selectSnapUploadProgress } from '../../state';

const genMessage = (progress) => {
  let text;

  switch (progress) {
    case 0:
      text = '⌛ Preparing your Snap ';
      break;

    case 100:
      text = '✔️ Just finishing up '; // files have reached server, but server then has to upload to Cloudinary...
      break;
    default:
      text = '⌛ Uploading ';
  }

  return text;
};

export const SnapUploaderProgressMessage = () => {
  const uploadProgress = useSelector(selectSnapUploadProgress);

  const message = genMessage(uploadProgress);

  return <LoadingText children={message} />;
};
