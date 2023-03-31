import { makeStyles } from '@material-ui/core';

export default makeStyles(({ shape }) => ({
  'profile-chip': {
    height: 51.5, // 32px* (always)
    borderRadius: shape.borderRadius * 8,
  },

  'profile-chip-avatar': {
    marginLeft: 5,
    marginRight: -5,
  },
}));
