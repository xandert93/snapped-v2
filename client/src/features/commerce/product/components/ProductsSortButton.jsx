import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../../../constants/routing-constants';
import { useURLParams } from '../../../../hooks';
import { genQueryString } from '../../../../utils/formatters/location-formatters';

export const ProductsSortButton = () => {
  // this is how max did it...why not just use a <Link>? To be fair, if using a <select>, the options shouldn't be <Link>s
  // also maybe eventually implement as a <select>

  const history = useHistory();
  const { sort } = useURLParams();

  const isDescending = sort === 'desc';

  const handleClick = () => {
    history.push({
      path: PATHS.SHOP,
      search: genQueryString({ sort: isDescending ? 'asc' : 'desc' }),
    });
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Sort {isDescending ? 'Ascending' : 'Descending'}
    </Button>
  );
};
