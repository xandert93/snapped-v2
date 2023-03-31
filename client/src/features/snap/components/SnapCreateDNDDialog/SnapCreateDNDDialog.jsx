import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialogId, selectIsDialogOpen } from '../../../ui/state/ui-selectors';
import { closeDialog } from '../../../ui/state/ui-slice';

import { DIALOGS } from '../../../../constants/modal-constants';
import { SnapCreateDNDDialogContent } from '../SnapCreateDNDDialogContent';

export const SnapCreateDNDDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsDialogOpen);
  const dialogId = useSelector(selectDialogId);

  const handleClose = () => dispatch(closeDialog());

  return (
    <Dialog
      open={isOpen && dialogId === DIALOGS.SNAP_CREATE_DND} //*** this is all quite clunky
      onDragOver={(e) => e.preventDefault()} // enable root <div> as a dropzone, so that contingency "onDrop" below can run
      onDragLeave={(e) => !e.relatedTarget && handleClose()}
      onDrop={(e) => {
        e.preventDefault(); // prevents opening of file in new tab
        handleClose();
      }}
      onClose={handleClose}
      children={<SnapCreateDNDDialogContent />}
    />
  );
};
