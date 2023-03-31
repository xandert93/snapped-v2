import { useDispatch } from 'react-redux';
import { DialogContentText } from '@material-ui/core';
import { BsCloudUploadFill as UploadIcon } from 'react-icons/bs';
import { FaFolderOpen as OpenFolderIcon } from 'react-icons/fa';

import { useToggle } from '../../../../hooks';

import useStyles from './styles';
import { handleFileSelection } from '../../state';
import { CenteredGrid } from '../../../../components';

export const SnapCreateDropzone = () => {
  const dispatch = useDispatch();
  const [isDragged, toggleIsDragged] = useToggle(false);

  const handleDropzoneDrop = async (e) => {
    e.preventDefault(); // prevents opening of file in new tab

    dispatch(handleFileSelection(e.dataTransfer.files));
  };

  const handleDragEvents = (e) => {
    e.currentTarget === e.target && !e.currentTarget.contains(e.relatedTarget) && toggleIsDragged();
  };

  const classes = useStyles({ isDragged });
  return (
    <CenteredGrid
      direction="column"
      className={classes['dropzone']}
      onDragEnter={handleDragEvents}
      onDragLeave={handleDragEvents}
      onDrop={handleDropzoneDrop}>
      <DialogContentText />
      <DialogContentText
        className={classes['dropzone-icon']}
        variant="h1"
        component={!isDragged ? OpenFolderIcon : UploadIcon}
      />
      <DialogContentText
        variant="p"
        children={!isDragged ? 'Drag your images here...' : '...and drop them!'}
      />
    </CenteredGrid>
  );
};

/* 

1) If we open the <PostCreate> modal without load completion, then its likely that it 
   will display no <img>s, but as each gets asynchonously added, this will cause 
   <PostCreate> to re-render each time, loading in each <img>. This is poor UX. 
   As such, we must await all file load completion.

*/
