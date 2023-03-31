import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateEffect } from '../../../../../hooks';
import { selectIsFormDisabled } from '../../../../ui/state/ui-selectors';

export const RegistrationEmailCheckbox = ({ email }) => {
  const isFormDisabled = useSelector(selectIsFormDisabled);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = (e) => setIsChecked(e.target.checked);

  const resetCheck = () => setIsChecked(false);
  useUpdateEffect(resetCheck, [email]);

  return (
    <Grid
      item
      xs={12}
      component={FormControlLabel}
      control={
        <Checkbox
          name="isChecked"
          checked={isChecked}
          onChange={handleCheck}
          required
          disabled={isFormDisabled}
        />
      }
      label={<Typography variant="body2">I confirm that the provided email is correct</Typography>}
    />
  );
};
