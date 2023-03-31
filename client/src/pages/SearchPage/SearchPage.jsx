import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PATHS } from '../../constants/routing-constants';
import { useURLParams } from '../../hooks';

import useStyles from './styles';

import { FeedSnapCard } from '../../features/snap/components';

import { useSetDocumentTitle } from '../../features/notification/hooks';

import { ProfileLink } from '../../features/user/components';
import { selectAuthUserUsername } from '../../features/user/state/user-selectors';

export const SearchPage = () => {
  const classes = useStyles();
  const { searchTerm } = useURLParams();

  useSetDocumentTitle(`Search - ${searchTerm}`);

  const [altUsers, setAltUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const userUsername = useSelector(selectAuthUserUsername);

  const dispatch = useDispatch();

  useEffect(() => {
    //filter users collection + posts collection
    // fbGetAltUsersBySearch(searchTerm, userUsername).then(setAltUsers);
    // fbGetPosts(allPublicTagPostsRef, userUsername).then(setPosts);
  }, [searchTerm]);

  if (!searchTerm) return <Redirect to={PATHS.EXPLORE} />;
  else
    return (
      <>
        <h1>Search</h1>
        {!!altUsers.length && (
          <Box>
            <h3>Users</h3>
            {altUsers.map(({ username }) => (
              <div key={username}>
                <ProfileLink username={username} children={username} />
              </div>
            ))}
          </Box>
        )}
        {!!posts.length && (
          <Box>
            <h3>Posts</h3>
            {posts.map((post, index) => index < 3 && <FeedSnapCard key={post.id} post={post} />)}
          </Box>
        )}
        {!!!altUsers.length && !!!posts.length && <h6>Diddly Squat found</h6>}
      </>
    );
};
