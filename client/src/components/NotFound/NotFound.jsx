import { Button, Typography } from '@material-ui/core';
import { BrokenImageRounded } from '@material-ui/icons';

import { useHistory } from 'react-router-dom';
import { Link } from '..';
import { PATHS } from '../../constants/routing-constants';

import useStyles from './styles';

export const NotFound = (props) => {
  const history = useHistory();

  return (
    <>
      <Typography variant="h1" component={BrokenImageRounded} />
      <Typography children="Sorry, this page isn't available." />
      <Typography children="The link you followed may be broken, or the page may have been removed." />
      <Link to={PATHS.HOME} children="Back to your Timeline" />
      <Button onClick={history.goBack} children="Go back" />
    </>
  );
};
