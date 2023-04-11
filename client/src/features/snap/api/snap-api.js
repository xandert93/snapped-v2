import { api } from '../../../api';

//@ '/'
// export const getBy = (params, offset) => api.get(`/${offset}`, { params });

const getFeed = (offset) => api.get(`/snaps/feed/${offset}`);

const getUsers = (userId, offset) => api.get(`/snaps/user/${userId}/${offset}`);

const getUsersPrivate = (userId, offset) => api.get(`/snaps/user/${userId}/private/${offset}`);

const getExplore = () => api.get('/snaps/explore');

const getByHashtags = (tagsStr, offset) => api.get(`/snaps/hashtags/${tagsStr}/${offset}`);
export const getByHashtagsCount = (tagsStr, offset) => api.get(`/snaps/hashtags/${tagsStr}/count`);

const getBySearch = (params) => api.get('/snaps/search', { params });

export const getSnapsRequest = ({ type, userId, tagsStr }) => {
  switch (type) {
    case 'feed':
      return getFeed;
    case 'auth':
    case 'profile':
      return (offset) => getUsers(userId, offset);
    case 'auth-private':
      return (offset) => getUsersPrivate(userId, offset);
    case 'explore':
      return getExplore;
    case 'explore-tags':
      return (offset) => getByHashtags(tagsStr, offset);
    case 'search':
      return (offset) => getBySearch(`searchterm or whatever`);
  }
};

export const getSuggested = (params) => api.get('/snaps/suggested', { params });

// export const getByUsername = (username) =>  api.get(`?username=${username}`);
// export const getByCreator = (creatorId) =>  api.get(`?creatorId=${creatorId}`);
// export const getByTag = (tag) =>  api.get(`?tag=${tag}`);
// export const getBySearch = (searchTerm) =>  api.get(`?q=${searchTerm}`);

export const create = (formData, uploadConfig) => api.post('/snaps', formData, uploadConfig);

//@ '/:snapId'
export const get = (id) => api.get(`/snaps/${id}`);
export const update = ({ id, update }) => api.patch(`/snaps/${id}`, update);
export const remove = (id) => api.delete(`/snaps/${id}`); //can't name "delete" (reserved JS keyword)

export const toggleLike = ({ id, wasLiked }) => api.patch(`/snaps/${id}/toggle-like`, { wasLiked });

export const getLikers = (id, offset) => api.get(`/snaps/${id}/likers/${offset}`);
