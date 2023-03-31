import { useState, useCallback, useRef } from 'react';

import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { LocationOnRounded } from '@material-ui/icons';

import parse from 'autosuggest-highlight/parse'; //https://www.npmjs.com/package/autosuggest-highlight
import { debounce } from 'lodash';

import useStyles from './styles';

export const LocationAutocomplete = (props) => {
  const acsRef = useRef(new window.google.maps.places.AutocompleteService()); //Autocomplete Service ref. Service Oi created by calling "window.google..." (API script in index.html injects "google" into window)

  const [selectedLocation, setSelectedLocation] = useState(null); //from dropdown, location Object choice
  const [locations, setLocations] = useState([]); //Objects that contain a ".description" property, amongst others. E.g. if input is "San Diego", top result Object.description is "San Diego, CA, USA". Highly suitable as the option label

  const fetchLocations = useCallback(
    debounce(async (input) => {
      const data = await acsRef.current.getPlacePredictions({ input });
      setLocations(data.predictions);
    }, 800),
    []
  );

  const handleChange = (e, val, reason) => {
    if (!val || reason === 'reset') {
      setLocations([]);
      fetchLocations.cancel();
    } else {
      fetchLocations(val);
    }
  };

  const handleAutoCompleteChange = (e, newLocation) => {
    setSelectedLocation(newLocation);
    newLocation && setLocations((s) => [newLocation, ...s]);
  };

  const classes = useStyles();
  return (
    <Autocomplete
      options={locations}
      getOptionLabel={(option) => option.description}
      filterOptions={(x) => x} //don't filter locations
      autoComplete
      includeInputInList
      filterSelectedOptions
      onInputChange={handleChange}
      value={selectedLocation}
      onChange={handleAutoCompleteChange}
      renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
      renderOption={Option}
      noOptionsText="No results"
    />
  );
};

function Option(option) {
  const {
    main_text_matched_substrings: matches,
    main_text,
    secondary_text,
  } = option.structured_formatting;

  const parts = parse(
    main_text,
    matches.map((match) => [match.offset, match.offset + match.length])
  );

  return (
    <li>
      <Grid container alignItems="center">
        <Grid item>
          <Box sx={{ color: 'primary.main', mr: 2 }} component={LocationOnRounded} />
        </Grid>
        <Grid item xs>
          {parts.map((part, index) => (
            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
              {part.text}
            </span>
          ))}
          <Typography variant="body2" color="text.secondary">
            {secondary_text}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
}
