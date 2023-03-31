import { Box, Grid, Grow, useMediaQuery } from '@material-ui/core';

import { Whatshot as FlameIcon } from '@material-ui/icons';

import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

import { openSnapDialogById } from '../../../ui/state/ui-actions';
import { isVPMinMd } from '../../../../theme/media-queries';
import { CldPreviewImage } from '../../../../components';
import { useSnap } from '../../context';
import { SnapMediaCarousel } from '../SnapMediaCarousel';
import { SnapMediaCounter } from '../SnapMediaCounter';

let wasTouchedTwice = false;

export const SnapCardMedia = () => {
  const { _id, creator, location, imageIds, toggleLike } = useSnap();
  const dispatch = useDispatch();

  const isMinMd = useMediaQuery(isVPMinMd);

  const [showFlame, setShowFlame] = useState(false);

  const handleImageTouch = (e) => {
    if (!wasTouchedTwice) {
      wasTouchedTwice = true;
      return setTimeout(() => (wasTouchedTwice = false), 250);
    }
    toggleLike();
    setShowFlame(true);
    setTimeout(setShowFlame, 600, false);
  };

  const handleImageClick = () => {
    isMinMd && dispatch(openSnapDialogById(_id));
  };

  const imageCount = imageIds.length;
  const hasMultiple = imageCount > 1;

  const classes = useStyles();
  return (
    <Box className={classes['snap-media-container']}>
      <SnapMediaCarousel>
        {imageIds.map((id, index) => (
          <Fragment key={id}>
            <CldPreviewImage
              className={classes['snap-media']}
              srcId={id}
              title={`Photo by ${creator.username} in ${location}`}
              onClick={handleImageClick}
              onTouchStart={handleImageTouch}
            />
            {hasMultiple && <SnapMediaCounter value={index + 1} total={imageCount} />}
          </Fragment>
        ))}
      </SnapMediaCarousel>
      <SnapLikeFlame in={showFlame} />
    </Box>
  );
};

const SnapLikeFlame = (props) => {
  const { isLiked } = useSnap();

  const classes = useStyles({ isLiked });
  return (
    <Grow in={props.in} timeout={1000} unmountOnExit>
      <Grid
        container
        className={classes['flame-icon-container']}
        justifyContent="center"
        alignItems="center">
        <FlameIcon className={classes['flame-icon']} />
      </Grid>
    </Grow>
  );
};

/*

See API here: https://www.npmjs.com/package/react-material-ui-carousel



To have <CardMedia> with video, we should tell it to use a <video> element and provide it
a valid source. Once the <video> element is specified, we can naturally pass it <video> attrs
e.g. autoplay (as autoPlay), controls etc. e.g.:

<CardMedia
  component='video'
  src='wherever_we_uploaded_it_to'
  autoPlay
  controls
/> 

  Read more here: https://stackoverflow.com/questions/63842284/autoplay-video-in-react-material-ui-cardmedia-component 
*/
