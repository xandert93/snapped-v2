import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { GridForm, Input } from '../../../../components';
import { updateAuthUserProfile } from '../../state/user-actions';

import useStyles from './styles';

const CHAR_LIMITS = {
  NAME: 50,
  BIO: 160,
  LOCATION: 30,
  WEBSITE_URL: 100,
};

export const ProfileForm = ({ details, setDetails }) => {
  const { dob, pronouns, bio, location, websiteURL } = details;
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateAuthUserProfile(details));
  };

  const classes = useStyles();
  return (
    <GridForm id="profile-form" onSubmit={handleSubmit}>
      <Input
        halve
        name="dob"
        label="🎈 Date of Birth"
        InputLabelProps={{ shrink: true }}
        type="date"
        max="2005-01-01" //*** can't get to work
        value={dob}
        onChange={handleInputChange}
        required={false}
      />
      <Input
        halve
        name="location"
        label="📍 Location"
        inputProps={{ maxLength: CHAR_LIMITS.LOCATION }}
        value={location}
        onChange={handleInputChange}
        helperText={`${location.length}/${CHAR_LIMITS.LOCATION}`}
        required={false}
      />
      <Grid item xs={12}>
        <FormControl className={classes.fieldset} component="fieldset">
          <FormLabel component="legend">👬 Pronouns</FormLabel>
          <RadioGroup row name="pronouns" value={pronouns} onChange={handleInputChange}>
            <FormControlLabel value="He/Him" control={<Radio color="primary" />} label="He/Him" />
            <FormControlLabel value="She/Her" control={<Radio />} label="She/Her" />
            <FormControlLabel value="They/Hey/Gay" control={<Radio />} label="They/Hey/Gay" />
            <FormControlLabel value="Puss" control={<Radio />} label="Puss" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Input
        name="bio"
        label="📜 Bio"
        inputProps={{ maxLength: CHAR_LIMITS.BIO }}
        value={bio}
        onChange={handleInputChange}
        helperText={`${bio.length}/${CHAR_LIMITS.BIO}`}
        required={false}
        multiline
        rows={4}
      />
      <Input
        name="websiteURL"
        type="url"
        label="🖥️ Website"
        inputProps={{ maxLength: CHAR_LIMITS.WEBSITE_URL }}
        value={websiteURL}
        onChange={handleInputChange}
        helperText={`${websiteURL.length}/${CHAR_LIMITS.WEBSITE_URL}`}
        required={false}
      />
    </GridForm>
  );
};
