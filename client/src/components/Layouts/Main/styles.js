import { makeStyles } from '@material-ui/core';
import { isVPSm, isVPXs } from '../../../theme/media-queries';

export default makeStyles(
  {
    main: {
      minHeight: `calc(100vh - 64px)`, // 1

      [isVPSm]: {
        paddingBottom: 64 + 16, // 2
      },

      [isVPXs]: {
        minHeight: `calc(100vh - 56px)`, // 1
        paddingBottom: 56 + 8, // 2
      },
    },
  },
  { index: 1 }
);

/*
1) Account for <TopNavigation> of 64px (and 56px for xs) height 

2) Account for sm and xs <BottomNavigation> of 64px and 56px height, respectively. 
   But since <Container> has 16px and 8px padding-bottom applied at
   these breakpoints, we should add them to our override too
*/
