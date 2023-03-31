import { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  CardHeader,
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';

import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import { buildSearchPath } from '../../../../../utils/routing-utils';

import { Cancel, Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { debounce } from 'lodash';

import { GridForm } from '../../../../../components';
import { ProfileLink } from '../../../../user/components';

//THINGS TO ADD:
//search bar should be able to find user by fullname
//trim the users accidental whitespace server side e.g. "banana   cream  pie" --> "banana cream pie". In UI, should show exactly what they typed in - see twitter

const data = [
  { firstName: 'Brenda', lastName: 'Van Riper', username: 'brendaspython', avatarURL: '' },
  { firstName: 'Bilbo', lastName: 'Van Riper', username: 'bilbs', avatarURL: '' },
  { firstName: 'Arwen', lastName: 'Van Riper', username: 'weenie', avatarURL: '' },
  { firstName: 'Zelda', lastName: 'Van Riper', username: 'zeldie', avatarURL: '' },
  { firstName: 'Charlie', lastName: 'Van Riper', username: 'chawwwie', avatarURL: '' },
  { firstName: 'Alex', lastName: 'T', username: 'xandert.93', avatarURL: '' },
];

export const TopNavigationSearchBar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const [searchTerm, setSearchTerm] = useState('');

  const handleCancelClick = () => {
    setSearchTerm('');
    setProfiles([]);
  };
  const handleSubmit = (e) => push(buildSearchPath(searchTerm.trim()));

  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);

  // useEffect(() => pathname !== PATHS.SEARCH && setSearchTerm(''), [pathname]);

  const fetchProfilesOnInput = useCallback(
    debounce(async (term) => {
      setProfiles(
        data.filter((p) =>
          [p.firstName, p.lastName, p.username].some((val) => new RegExp(term, 'i').test(val))
        )
      );
      setIsLoading(false);
    }, 2500),
    []
  );

  const handleChange = (e, val, reason) => {
    setSearchTerm(val);
    setProfiles([]);
    /*
    reason=Str e.g. 
    "input" (when user has typed something in)
    "reset" (when user selects an option)
    "clear" (when user clicks clear button)
    */
    if (val.length < 3 || reason === 'reset') {
      setIsLoading(false);
      fetchProfilesOnInput.cancel(); //cancels pending invocation of debounced function
    } else {
      setIsLoading(true);
      fetchProfilesOnInput(val);
    }
  };

  return (
    <GridForm justifyContent="center" onSubmit={handleSubmit}>
      <Autocomplete
        PaperComponent={Paper} //default, but style as I see fit. Or, use classes={{paper: _}}
        freeSolo
        inputValue={searchTerm}
        onInputChange={handleChange}
        options={profiles}
        getOptionLabel={(profile) => profile.username}
        filterOptions={(profile) => profile} //profiles are already filtered. Otherwise only shows options whose username matches searchTerm
        // loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            color="primary"
            fullWidth={false}
            placeholder="Search snapped!"
            InputProps={{
              ...params.InputProps,
              className: classes.searchInputBase,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <Fade in={Boolean(searchTerm)} timeout={300}>
                  <InputAdornment position="end">
                    {isLoading ? (
                      <CircularProgress size="1.3em" />
                    ) : (
                      <IconButton onClick={handleCancelClick}>
                        <Cancel color="secondary" />
                      </IconButton>
                    )}
                  </InputAdornment>
                </Fade>
              ),
            }}
            inputProps={{
              ...params.inputProps,
              className: classes.searchInput,
            }}
          />
        )}
        renderOption={Option}
        disableClearable //so I can use my custom one
        forcePopupIcon={false}
      />
    </GridForm>
  );
};

function Option(profile, state) {
  // console.log(state); //OP: {selected: Bool, inputValue: Str} - selected becomes true when option is clicked and inputValue matches that of the <input>

  // const classes = useStyles();
  return (
    <ProfileLink username={profile.username}>
      <CardHeader
        style={{ padding: 0 }}
        // classes={{ content: classes.blah }}
        avatar={<Avatar>{profile.username[0]}</Avatar>}
        title={profile.username}
        titleTypographyProps={{
          variant: 'body2',
          style: { fontWeight: 400, letterSpacing: 0 },
          // className: classes.cardTitle,
        }}
        subheader={profile.firstName + ' ' + profile.lastName}
        //twitter search includes another subheader which contains "Following" || numOf "Followers" || first line of bio (truncated with...)
        subheaderTypographyProps={{
          variant: 'subtitle2',
          // className: classes.cardSubheader,
        }}
      />
    </ProfileLink>
  );
}
