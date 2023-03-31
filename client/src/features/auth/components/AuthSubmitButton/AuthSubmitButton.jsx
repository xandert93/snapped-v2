import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';

import { selectIsFormDisabled, selectIsRequesting } from '../../../ui/state/ui-selectors';
import { GradientButton, LoadingButton } from '../../../../components';

import useStyles from './styles';

// props => { children, form? }
export const AuthSubmitButton = (props) => {
  const isFormDisabled = useSelector(selectIsFormDisabled);
  const isRequesting = useSelector(selectIsRequesting);

  const classes = useStyles();
  return (
    <Grid item xs={11}>
      <LoadingButton
        className={classes['auth-submit-button']}
        component={(props) => <GradientButton type="submit" {...props} />} // 1
        variant="contained"
        fullWidth
        isLoading={isRequesting}
        disabled={isFormDisabled || isRequesting}
        {...props}
      />
    </Grid>
  );
};

/*
1) I tried my hardest to debug, but passing <GradientButton> alone resulted in `type='submit'`
   prop not getting passed into <LoadingButton>. All other props get passed, though. Weird.

   Anyway, the call basically returns a "GradientSubmitButton".

*/
