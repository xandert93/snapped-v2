export const PATHS = {
  AUTH: '/auth',
  REGISTRATION: '/auth/register',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  PASSWORD_RESET: '/auth/password-reset',
  ACTIVATION: '/activation',

  HOME: '/', //IG, FB
  PROFILE: '/:username', //IG, Twitter, FB
  EXPLORE: '/explore',
  SNAP: '/snap/:id', //IG
  SEARCH: '/search', //query string is a separate entity from "pathname", so "/search" still matches irrespective of the query string
  SUBSCRIPTION: '/subscription',
  ACCOUNT: '/account',
  MESSAGES: '/messages', //FB, Twitter
  NOT_FOUND: '/404',

  //*** Probably need to add these to forbidden usernames
  SHOP: '/products',
  PRODUCT: '/products/:id',
  BASKET: '/basket',
  CHECKOUT_SETTLED: '/payment',
  ORDERS: '/orders',
  ORDER: '/orders/:id',
};

//^patterns --> can be checked via const { path } = useRouteMatch();

const other_sm_app_routes = {
  TW_HOME: '/home',
  TW_SNAP: '/:username/snap/:snapId', //one to consider. May have benefits but routing will be tricky
  TW_NOTIFICATIONS: '/notifications', //only Twitter have bespoke page for notifications. Other two use dropdowns
};

/*
In Facebook, settings page they use: '/settings/?tab=tabName' to switch between tabs. One to consider for profile!

Also, all these apps use much more complicated settings pages, where "/account" is actually nested within it. I don't have the need

*/
