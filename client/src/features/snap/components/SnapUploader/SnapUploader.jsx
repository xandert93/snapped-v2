import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Grid } from '@material-ui/core';

import { createSnap, selectNewSnap, selectIsSnapPosting, clearSnapUpload } from '../../state';

import { SnapUploaderImage } from './SnapUploaderImage';
import { SnapUploaderProgressMessage } from './SnapUploaderProgressMessage';
import { SnapUploaderProgressBar } from './SnapUploaderProgressBar';

import useStyles from './styles';

export const SnapUploader = () => {
  const dispatch = useDispatch();

  const newSnap = useSelector(selectNewSnap);
  const isPosting = useSelector(selectIsSnapPosting);

  const uploadSnap = () => dispatch(createSnap(newSnap));
  const cleanup = () => dispatch(clearSnapUpload()); // since no unmount, this is next best thing for cleanup

  const classes = useStyles();
  return (
    <Snackbar
      open={isPosting}
      className={classes['snap-uploader']}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      TransitionProps={{
        onEntered: uploadSnap,
        onExited: cleanup,
        unmountOnExit: true, // otherwise remains in DOM and blocks other elements
      }}
      message={<SnapUploaderContent />}
      ContentProps={{ className: classes['snap-uploader-content'] }}
    />
  );
};

const SnapUploaderContent = () => {
  return (
    <Grid container spacing={2} justifyContent="space-between" wrap="nowrap">
      <Grid item>
        <SnapUploaderImage />
      </Grid>
      <Grid item container spacing={1} alignContent="center">
        <Grid item xs={12}>
          <SnapUploaderProgressMessage />
        </Grid>
        <Grid item xs={12}>
          <SnapUploaderProgressBar />
        </Grid>
      </Grid>
    </Grid>
  );
};

//***potentially create reusable <CollapseFade> component
//also display snackbar error message if SnapCreateFAB clicked or main dragged while uploading
//rate limit/throttle posts to prevent spam from malicious users
