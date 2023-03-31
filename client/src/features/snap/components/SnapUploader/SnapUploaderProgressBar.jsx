import { useSelector } from 'react-redux';
import { RoundedLinearProgress } from '../../../../components';
import { selectSnapUploadProgress } from '../../state';

const genProgressBarProps = (progress) => {
  switch (progress) {
    case 0:
      return {
        variant: 'indeterminate',
        color: 'primary',
      };

    case 100:
      return {
        variant: 'determinate',
        color: 'secondary',
      };

    default:
      return {
        variant: 'determinate',
        color: 'primary',
      };
  }
};

export const SnapUploaderProgressBar = () => {
  const uploadProgress = useSelector(selectSnapUploadProgress);

  const props = genProgressBarProps(uploadProgress);

  return <RoundedLinearProgress key={props.variant} {...props} value={uploadProgress} />;
};
