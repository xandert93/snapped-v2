import { DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { CenteredGrid } from '../../../../components';
import { SnapCreateDropzone } from '../SnapCreateDropzone';

import useStyles from './styles';

export const SnapCreateDNDDialog = () => {
  const classes = useStyles();

  return (
    <DialogContent className={classes['dnd']}>
      <CenteredGrid direction="column">
        <Typography
          className={classes['dnd-title']}
          variant="h4"
          component="h2"
          children="Create a Snap!"
        />
        <DialogContentText variant="caption" children="Media should be .jpeg, .png, .gif" />
        <SnapCreateDropzone />
      </CenteredGrid>
    </DialogContent>
  );
};

//used raw <Typography> because <DialogContentText> comes with 12px margin bottom, which I didn't want
