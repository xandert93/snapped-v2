import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'file-input-label': ({ hidden }) => ({
    ...(hidden && {
      // spread invisible label all over surface of parent button like nutella
      ...theme.mixins.absCover,
      cursor: 'pointer',
    }),
  }),
}));
