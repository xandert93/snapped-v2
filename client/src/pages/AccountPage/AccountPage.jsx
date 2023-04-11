import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Button, Typography, Container, Grid } from '@material-ui/core';
import useStyles from './styles';

import { Input, Link, Main } from '../../components';

import { selectAuthUser } from '../../features/user/state/user-selectors';
import { useSetDocumentTitle } from '../../hooks';
import { openConfirmDialog } from '../../features/ui/state/ui-slice';
import { DIALOGS } from '../../constants/modal-constants';

export const AccountPage = () => {
  useSetDocumentTitle('My Account');
  const { path, url } = useRouteMatch();

  return (
    <Main maxWidth="sm">
      <Grid spacing={2}>
        {/* <Grid item>
          <Link to={url + '/subscription'} children="Manage Your Subscription" />
        </Grid> */}
        <Grid item>
          <Link to={url + '/delete'} children="Delete Your Account" />
        </Grid>
      </Grid>
      <Switch>
        {/* <Route path={path + '/subscription'} component={Subscription} /> */}
        <Route path={path + '/delete'} component={DeleteAccountButton} />
      </Switch>
    </Main>
  );
};

const DeleteAccountButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(openConfirmDialog(DIALOGS.ACCOUNT_DELETE));

  return (
    <Button variant="contained" color="secondary" onClick={handleClick} children="Delete Account" />
  );
};

function Account_OLD() {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState('');
  //inefficient - make into a single message
  const [successMsg, setSuccessMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const nameRef = useRef();
  // const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const attemptUpdate = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setSuccessMsg('');
    const name = nameRef.current.value;
    // const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (password !== passwordConfirm) {
      return setErrMsg('The two entered password do not match.');
    }

    //REFACTOR:
    const promises = [];
    if (
      name !== user.name ||
      email !== user.email
      // || username !== user.username
    ) {
      promises
        .push
        // db.collection('Users').doc(user.id).update({
        //   name,
        //   email /*, username */,
        // })
        ();
    }

    // if (username !== user.username) {
    //   promises.push(updateProfileHeaderData({ displayName: username }));
    //   promises.push(updatePostsUsername(user.username, username));
    // }

    if (email !== user.email) promises.push(/* fbAuthUser.updateEmail(email) */);
    if (password && password !== user.password)
      promises.push(/* fbAuthUser.updatePassword(password) */);

    if (!promises.length) return setErrMsg('Please update your account details before submitting.');

    try {
      setIsUpdating(true);
      //first need to update Auth user, DB user and current propagated user
      await Promise.all(promises)
        .then(() => dispatch('loggedIn'({ ...user, name, /*username,*/ email })))
        .finally(() => setIsUpdating(false));
      setSuccessMsg('Your account details have been updated.');
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <form className={classes.form} onSubmit={attemptUpdate}>
        {successMsg && <Typography color="primary">{successMsg}</Typography>}

        <Input inputRef={nameRef} label="Full Name" defaultValue={user.name} required />
        {/* <Input
        
        inputRef={usernameRef}
        
        label="Username"
        defaultValue={user.username}
        required
      /> */}
        <Input
          inputRef={emailRef}
          label="Email address"
          defaultValue={user.email}
          type="email"
          required
        />
        <Input
          inputRef={passwordRef}
          label="Password"
          type="password"
          required={false}
          helperText="Please leave blank to keep the same."
        />
        <Input
          inputRef={passwordConfirmRef}
          label="Password"
          type="password"
          required={false}
          helperText="Please leave blank to keep the same."
        />
        {errMsg && <Typography color="error">{errMsg}</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={isUpdating}>
          Update Details
        </Button>
      </form>
    </Container>
  );
}
