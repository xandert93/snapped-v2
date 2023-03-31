import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Tab,
  Tabs,
  useMediaQuery,
} from '@material-ui/core';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { userAPI } from '../../api';
import { selectUserId } from '../../state/user-selectors';
import {
  GradientAppBar,
  NoDataText,
  RetryRequest,
  ScrollEndText,
  SlideDown,
  SlideLeft,
} from '../../../../components';
import { useHTTP, useInfiniteScroll } from '../../../../hooks';
import { isVPXs } from '../../../../theme/media-queries';

import useStyles from './styles';
import { RelationList } from '../RelationList';

/*
None of this really feels ideal and its almost certain there are better approaches
to getting the desired functionality. But I don't really care for this feature 
and for now this code does the trick.

I also probably need to cancel requests between tab switching...

useReducer may have also been a better fit (given current setup), but CBA...
*/

export const ProfileRelationDialog = (props) => {
  const { type } = useParams();
  const isOpen = ['followers', 'following'].includes(type);
  const { parentUrl, type: profileType } = props;

  const userId = useSelector(selectUserId(profileType));

  const isXs = useMediaQuery(isVPXs);

  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const userCount = users.length;
  const hasUsers = Boolean(userCount);

  const [isFetching, errMessage, fetchUsers] = useHTTP({
    request: type === 'following' ? userAPI.getFollowing : userAPI.getFollowers,
    args: [userId, userCount],
    onFetched: (data) => {
      setUsers((prev) => prev.concat(data.users));
      setHasMore(data.hasMore);
    },
  });

  const foundNoUsers = !isFetching && !hasUsers && !errMessage;

  const watchUser = useInfiniteScroll({
    callback: fetchUsers,
    hasMore,
    dependencies: [userCount],
  });

  const clearState = () => {
    setUsers([]); // 1
    setHasMore(false);
  };

  const handleTabChange = (e, tabName) => {
    if (type === tabName) return; // 2
    clearState(); // 3
    history.push(`${parentUrl}/${tabName}`);
  };

  useEffect(() => {
    if (isOpen) fetchUsers();
  }, [isOpen, type]);

  const history = useHistory();
  const goBack = () => history.push(parentUrl);

  const classes = useStyles();
  return (
    <Dialog
      classes={{ paper: classes['relation-dialog-paper'] }}
      open={isOpen}
      maxWidth="xs"
      TransitionComponent={!isXs ? SlideDown : SlideLeft}
      onClose={goBack}
      TransitionProps={{ onExited: clearState }}
      fullScreen={isXs}>
      <GradientAppBar component="div" position="static" color="inherit">
        <Tabs variant="fullWidth" value={type} onChange={handleTabChange} indicatorColor="primary">
          <Tab label="followers" value="followers" />
          <Tab label="following" value="following" />
        </Tabs>
      </GradientAppBar>
      <Grid
        container
        justifyContent="center"
        alignItems={!hasUsers && 'center'}
        component={DialogContent}>
        {hasUsers && (
          <Grid item xs={12}>
            <RelationList users={users} watchUser={watchUser} />
            <Grid container justifyContent="center">
              {!isFetching && !hasMore && <ScrollEndText />}
            </Grid>
          </Grid>
        )}
        {isFetching && <CircularProgress size="2rem" />}
        {errMessage && <RetryRequest message={errMessage} callback={fetchUsers} />}
        {foundNoUsers && <NoDataText children="No users found" />}
      </Grid>
    </Dialog>
  );
};

/*
1) should probably also include `setIsFetching(false)`, but that's integrated into the 
   hook, so CBA

2) handleTabChange fires every time a tab is clicked. Obviously we don't want to `push` 
   again to the same location, since we'd clog up the history stack

3) I feel like this should be somehow abstracted into a useEffect hook, but CBA
*/
