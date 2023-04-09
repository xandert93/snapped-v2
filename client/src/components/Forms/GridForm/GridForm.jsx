import { Grid } from '@material-ui/core';
import { Form } from '../Form';

import useStyles from './styles';

// props => { id?, onSubmit, children }
export const GridForm = (props) => {
  const classes = useStyles();

  return <Grid container spacing={2} component={Form} {...props} />;
};
