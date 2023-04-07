import { useDispatch } from 'react-redux';
import { openDialog } from '../../../ui/state/ui-slice';
import { DIALOGS } from '../../../../constants/modal-constants';
import { Main } from '../../../../components';

export const SnapCreateMain = (props) => {
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault(); // makes <Main> a valid drop target
    dispatch(openDialog(DIALOGS.SNAP_CREATE_DND)); // could use local `isOpen` state here and pass as props, but then entire <Home> would re-render on drag interaction
  };

  return <Main onDragOver={handleDragOver} {...props} />;
};
