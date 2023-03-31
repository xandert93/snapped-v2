import { Box, Grid, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { CommentIcon, FlameIcon, Icon } from '../../../../../components';
import { selectSnapCommentCount, selectSnapLikeCount } from '../../../state';

import useStyles from './styles';

export const SnapPreviewImageOverlay = ({ id }) => {
  const likeCount = useSelector(selectSnapLikeCount(id));
  const commentCount = useSelector(selectSnapCommentCount(id));

  const classes = useStyles();
  return (
    <Grid
      className={classes.overlay}
      container
      justifyContent="center"
      alignItems="center"
      spacing={1}>
      <Grid item>
        <Icon variant="h5" component={FlameIcon} style={{ verticalAlign: -7 }} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="span" children={likeCount} />
      </Grid>
      <Grid item>
        <Icon variant="h5" component={CommentIcon} style={{ verticalAlign: -7 }} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="span" children={commentCount} />
      </Grid>
    </Grid>
  );
};

//if using event delegation:
//for non-mobile devices, since overlay will block original image,
//"data-index={index}" was previously needed for their div, enabling modal opening
