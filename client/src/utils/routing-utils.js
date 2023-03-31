export const genProfilePath = (username) => `/${username}`;

export const buildExplorePath = (tags) => `/explore/tags/${tags}`;

export const genSnapPath = (id) => `/snap/${id}`;

export const buildSearchPath = (searchTerm) => `/search?search_query=${searchTerm}`; //replaces value whitespaces with "%20" for us
