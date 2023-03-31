import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'card-tags-box': {
    textAlign: 'center',
    fontStyle: 'italic',

    '& > *': {
      margin: theme.spacing(0.3),
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },

    '& .MuiChip-labelSmall': {
      paddingRight: 12, //additional 4px, since italic text looks ugly without
    },
  },

  // cardTags: {
  //   textAlign: 'center',
  //   fontStyle: 'italic',
  //   fontWeight: 'bold',
  // },
}));
