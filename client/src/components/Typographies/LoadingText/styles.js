import { makeStyles } from '@material-ui/core';
import { ellipsis } from '../../../theme/animations/ellipsis-animation';
import { loadingEllipsis } from '../../../theme/pseudo-elements/loading-ellipsis';

export default makeStyles((theme) => ({
  ...ellipsis,
  'loading-typography': {
    ...loadingEllipsis,
  },
}));
