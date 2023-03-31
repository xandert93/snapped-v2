import { Alert, AlertTitle } from '@material-ui/lab';

export const LoadingAlert = ({ text }) => {
  return <Alert severity="info" color="warning" children={<AlertTitle children={text} />} />;
};
