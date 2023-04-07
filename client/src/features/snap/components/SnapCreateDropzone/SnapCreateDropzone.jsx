import { useDispatch } from 'react-redux';
import { DialogContentText } from '@material-ui/core';
import { BsCloudUploadFill as DropIcon } from 'react-icons/bs';
import { FaFolderOpen as OpenFolderIcon } from 'react-icons/fa';

import { useToggle } from '../../../../hooks';

import useStyles from './styles';
import { handleSnapFileSelection } from '../../state';
import { CenteredGrid } from '../../../../components';

export const SnapCreateDropzone = () => {
  const dispatch = useDispatch();
  const [isDragged, toggleIsDragged] = useToggle(false);

  const handleDropzoneDrop = async (e) => {
    e.preventDefault(); // prevents opening of file in new tab
    dispatch(handleSnapFileSelection(e.dataTransfer.files));
  };

  const handleDragEvent = (e) => {
    e.currentTarget === e.target && !e.currentTarget.contains(e.relatedTarget) && toggleIsDragged();
  };

  const classes = useStyles({ isDragged });
  return (
    <CenteredGrid
      direction="column"
      className={classes['dropzone']}
      onDragEnter={handleDragEvent}
      onDragLeave={handleDragEvent}
      onDrop={handleDropzoneDrop}>
      <DialogContentText />
      <DialogContentText
        className={classes['dropzone-icon']}
        variant="h1"
        component={!isDragged ? OpenFolderIcon : DropIcon}
      />
      <DialogContentText children={!isDragged ? 'Drag your images here...' : '...and drop them!'} />
    </CenteredGrid>
  );
};

/* 

1) If we open the <PostCreate> modal without load completion, then its likely that it 
   will display no <img>s, but as each gets asynchonously added, this will cause 
   <PostCreate> to re-render each time, loading in each <img>. This is poor UX. 
   As such, we must await all file load completion.

*/
