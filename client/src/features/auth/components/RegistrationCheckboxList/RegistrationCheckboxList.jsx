import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '../../../../components';
import { disableForm, enableForm } from '../../../ui/state/ui-slice';

const checkboxes = [
  {
    name: 'privacy',
    required: true,
    label: (
      <>
        I have read and accept the <Link to="">Privacy Policy</Link> and understand that my personal
        data will not be shared
      </>
    ),
  },
  {
    name: 'optedIn',
    required: false,
    label: (
      <>
        Want to opt-in to hear about our latest offers via email and post? You can change your
        preferences at any time via <Link to="">www.snapped.com/preferences</Link>
      </>
    ),
  },
  {
    name: 'terms',
    required: true,
    label: (
      <>
        I have read and accept the <Link to="">Terms of Use</Link>
      </>
    ),
  },
];

const initialState = {
  privacy: false,
  optedIn: false, //for now, this does nothing on BE
  terms: false,
};

export const RegistrationCheckboxList = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);

  const handleCheck = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  useEffect(() => {
    const areTermsAccepted = state.privacy && state.terms;
    dispatch(areTermsAccepted ? enableForm() : disableForm());
  }, [state.privacy, state.terms]);

  return checkboxes.map(({ name, required, label }) => (
    <Grid
      key={name}
      item
      component={FormControlLabel}
      control={<Checkbox checked={state[name]} onChange={handleCheck} {...{ name, required }} />}
      label={<Typography variant="body2">{label}</Typography>}
    />
  ));
};
