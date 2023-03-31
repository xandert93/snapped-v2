import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ palette, transitions }) => ({
  'auth-user-avatar': ({ fontSize = 20, border, hover }) => ({
    fontSize, // font-size still needs to be used for text if URL is invalid (temp fix)
    height: '2em',
    width: '2em',

    [isVPXs]: {
      fontSize: fontSize * 0.8,
    },

    ...(border && {
      border: '2px solid currentColor', // 1

      ...(hover && {
        transition: transitions.create('border-color'),
        '&:hover': {
          borderColor: palette.secondary.light,
        },
      }),
    }),
  }),
}));

/*
1) `currentColor` handy for <AuthUserAvatar> in <TopNavigation> (because it's a <Typography> 
   <Link> which has color primary) and in <BottomNavigation> (because 
   <BottomNavigationAction> has color of text primary, but when "selected", color of primary)

*/
