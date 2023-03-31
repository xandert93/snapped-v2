export const addProfileToLS = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

const getProfileFromLS = () => {
  const jsonProfile = localStorage.getItem('profile'); //returns "null" if nothing there
  return JSON.parse(jsonProfile); //returns "null" if "null" passed in
};

export const getUserIdFromLS = () => {
  const profile = getProfileFromLS();
  return profile?._id;
};

export const getUsernameFromLS = () => {
  const profile = getProfileFromLS();
  return profile?.username;
};

export const getAccessTokenFromLS = () => {
  const profile = getProfileFromLS();
  return profile?.accessToken;
};

export const getRefreshTokenFromLS = () => {
  const profile = getProfileFromLS();
  return profile?.refreshToken;
};

export const updateTokensInLS = ({ accessToken }) => {
  let profile = getProfileFromLS();
  profile.accessToken = accessToken;
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const clearProfileFromLS = () => {
  localStorage.removeItem('profile');
};
