import { Typography } from '@material-ui/core';

// props => { children }
export const NoDataText = (props) => {
  return <Typography variant="caption" component="p" color="textSecondary" {...props} />;
};
