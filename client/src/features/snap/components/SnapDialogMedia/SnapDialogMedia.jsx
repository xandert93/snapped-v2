import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CldImage } from '../../../../components';
import { selectSelectedSnapImageIds } from '../../state';
import { SnapMediaCarousel } from '../SnapMediaCarousel';
import { SnapMediaCounter } from '../SnapMediaCounter';

import useStyles from './styles';

export const SnapDialogMedia = () => {
  const imageIds = useSelector(selectSelectedSnapImageIds);

  const imageCount = imageIds.length;
  const hasMultiple = imageCount > 1;

  const classes = useStyles();
  return (
    <SnapMediaCarousel className={classes['snap-media-carousel']} animation="fade">
      {imageIds.map((id, index) => (
        <Box key={id} className={classes['snap-media-container']}>
          <CldImage className={classes['snap-media']} key={id} srcId={id} />
          {hasMultiple && <SnapMediaCounter value={index + 1} total={imageCount} />}
        </Box>
      ))}
    </SnapMediaCarousel>
  );
};
