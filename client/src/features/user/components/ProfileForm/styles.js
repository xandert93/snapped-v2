import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  fieldset: {
    width: '100%',

    '& > [role="radiogroup"]': {
      justifyContent: 'center',

      '& svg': {
        [isVPXs]: {
          fontSize: 22,
        },
      },
    },
  },
}));
