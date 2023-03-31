export const getQueryString = () => window.location.search;

export const getURLParams = (queryStr) => {
  return Object.fromEntries(new URLSearchParams(queryStr)); // => { param1, param2 ... }
};

export const genQueryString = (params) => {
  return '?' + new URLSearchParams(params).toString(); // e.g. params = { a: 1, b: 2 } => '?a=1&b=2'
};
