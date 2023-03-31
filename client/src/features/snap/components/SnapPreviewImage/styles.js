import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'snap-preview-image': ({ hover }) => ({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',

    ...(hover && {
      opacity: 0.9,
      transition: theme.transitions.create(['opacity', 'transform']),

      '&:hover': {
        opacity: 1,
        transform: 'scale(1.05)',
      },
    }),
  }),
}));
