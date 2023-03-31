import { useCallback, useEffect, useState } from 'react';
import {
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';

import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import { PATHS, buildSearchPath } from '../../../../modal-constants';
import { GridForm, Link } from '../components';
import { Cancel, Replay, Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { debounce } from '../../../../utils/helpers';
import axios from 'axios';

//THINGS TO ADD:
//search bar should be able to find user by fullname
//trim the users accidental whitespace server side e.g. "banana   cream  pie" --> "banana cream pie". In UI, should show exactly what they typed in - see twitter

export const TopNavigationSearchBar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const [searchTerm, setSearchTerm] = useState('');

  // const handleChange = (e) => setSearchTerm(e.target.value);
  const handleCancelClick = () => setSearchTerm('');
  const handleSubmit = (e) => push(buildSearchPath(searchTerm.trim()));

  useEffect(() => pathname !== PATHS.SEARCH && setSearchTerm(''), [pathname]);

  const [isOpen, setIsOpen] = useState(false); //controls autocomplete <Popper> state
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  // const handleOpen = () => searchTerm && setIsOpen(true);
  // const handleClose = () => setIsOpen(false);

  // const handleChange = (e) => setSearchTerm(e.target.value);
  const handleChange = (e, val) => {
    console.log('e.target.value :>> ', e.target.value);
    console.log('val :>> ', val);

    setSearchTerm(val);
  };

  useEffect(() => setIsOpen(searchTerm ? true : false), [searchTerm]);

  const getData = useCallback(
    debounce(async (searchTerm) => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/comments?postId=' + Math.ceil(Math.random() * 100)
      );
      setResults(data);
      setIsLoading(false);
    }, 800),
    []
  );

  useEffect(() => {
    if (!searchTerm) setResults([]);
    else {
      setResults([]);
      setIsLoading(true);
      getData(searchTerm.trim());
    }

    return () => setIsLoading(false);
  }, [searchTerm]);

  return (
    <Grid item md={6} lg component={GridForm} justifyContent="center" onSubmit={handleSubmit}>
      <Autocomplete
        open={isOpen && !isLoading}
        // onOpen={handleOpen} //by default, <Popper> opens on any focus
        // onClose={handleClose} //close on "esc" or clickaway
        // inputValue={searchTerm}
        onInputChange={handleChange}
        clearOnBlur={true} //default behaviour is "true" - field is cleared once user clicks away. Initially wanted "false", but this causes small popper bug
        options={results}
        noOptionsText={
          <Typography align="center">No results for {searchTerm}. Please try again!</Typography>
        }
        //displayed when popup is open and results.length = 0
        filterOptions={(option) => option} //allows us to control which results we hide. As filtration takes place on server, we ensure that no options are filtered client-side
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
                      <CircularProgress size={20} />
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
        getOptionLabel={(option) => option.name} //function that, for each option, returns String inserted into field once option selected. Changes the "inputValue"
        renderOption={(result, state) => {
          // console.log(state); //OP: {selected: Bool, inputValue: Str} - selected becomes true when option is clicked and inputValue matches that of the <input>
          return <Link to={'/test'}>{result.name}</Link>;
        }}
      />
    </Grid>
  );

  // return (
  //   <Grid item md={6} lg component={GridForm} justifyContent="center" onSubmit={handleSubmit}>
  //     <TextField
  //       size="small"
  //       color="primary"
  //       fullWidth={false}
  //       placeholder="Search snapped!"
  //       value={searchTerm}
  //       onChange={handleChange}
  //       InputProps={{
  //         className: classes.searchInputBase, //container that contains the <input>
  //         startAdornment: (
  //           <InputAdornment position="start">
  //             <Search />
  //           </InputAdornment>
  //         ),
  //         endAdornment: (
  //           <Fade in={Boolean(searchTerm)} timeout={300}>
  //             <InputAdornment position="end">
  //               <IconButton onClick={handleCancelClick}>
  //                 <Cancel color="secondary" />
  //               </IconButton>
  //             </InputAdornment>
  //           </Fade>
  //         ),
  //       }}
  //       inputProps={{ className: classes.searchInput }}
  //     />
  //   </Grid>
  // );
};

/*

<Autocomplete/> has 2 separate states, that should be controlled independently: 

1) value/onChange props - represents the value selected by the user, for instance when pressing Enter.
2) inputValue/onInputChange props - represents the value displayed in the textbox.

<Autocomplete /> passes critical InputProps, InputLabelProps and inputProps as part of the params passed to TextField.
If we want to pass our own, we must spread the <Autocomplete/>'s passed props too

*/
