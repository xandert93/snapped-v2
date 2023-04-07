import { makeStyles } from '@material-ui/core';
import { isVPMinMd } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  dialogContent: {
    [isVPMinMd]: { padding: theme.spacing(2) },
  },
}));
