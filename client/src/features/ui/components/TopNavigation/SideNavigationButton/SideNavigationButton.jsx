import { MenuRounded as BurgerMenuIcon } from '@material-ui/icons';

import { useDispatch } from 'react-redux';

import { IconButton } from '../../../../../components';
import { toggleDrawer } from '../../../state/ui-slice';

export const SideNavigationButton = () => {
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(toggleDrawer())}>
      <BurgerMenuIcon color="primary" />
    </IconButton>
  );
};
