import { api } from '../../../api';

//REQUEST @ '/'
export const create = (newUser) => {
  return api.post('/users', newUser);
};
export const getBySearch = (searchTerm) => {
  return api.get(`/users?q=${searchTerm}`);
};

//REQUEST @ '/username?username=val'
export const getByUsername = (username) => {
  return api.get(`/users/username/${username}`);
};

//REQUEST @ '/suggested'
export const getSuggested = (count) => {
  return api.get(`/users/suggested?size=${count}`);
};

//REQUEST @ '/:id'
export const toggleFollow = ({ userId: id, wasFollowed }) => {
  return api.patch(`/users/${id}/toggle-follow`, { wasFollowed });
}; //:id will always be an "altUserId"

export const getFollowers = (id, offset) => {
  return api.get(`/users/${id}/followers/${offset}`);
};

export const getFollowing = (id, offset) => {
  return api.get(`/users/${id}/following/${offset}`);
};

// export const getRelations = (id, type) => {
//   return api.get(`/users/${id}/relations?type=${type}`);
// };

export const getSnapshot = (id) => {
  return api.get(`/users/${id}/snapshot`);
};

//REQUEST @ '/user'
export const update = (update) => {
  return api.patch(`/users/user`, update);
};
export const remove = () => {
  return api.delete(`/users/user`);
};

export const updateAvatar = (imageData) => {
  return api.patch(`/users/user/avatarId`, imageData);
};
export const resetAvatar = () => {
  return api.delete(`/users/user/avatarId`);
};

export const updateProfile = (update) => {
  return api.patch(`/users/user/profile`, update);
};

export const updateProfileCover = (imageData) => {
  return api.patch(`/users/user/profile/coverId`, imageData);
};
export const resetProfileCover = () => {
  return api.delete(`/users/user/profile/coverId`);
};

export const updatePassword = (passwordData) => {
  return api.patch(`/users/user/password`, passwordData);
};
