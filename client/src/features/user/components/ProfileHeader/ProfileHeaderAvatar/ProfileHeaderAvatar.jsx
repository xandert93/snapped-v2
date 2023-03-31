import {
  CameraIcon,
  CircularButtonBase,
  CldImage,
  DeleteIcon,
  IconButton,
  UpdateIcon,
  Tooltip,
} from '../../../../../components';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { Button, Dialog, Grid } from '@material-ui/core';
import { useToggle } from '../../../../../hooks';

import { selectUserAvatarId } from '../../../state/user-selectors';
import { resetAvatar } from '../../../state/user-actions';
import { UpdateAvatarInput } from '../../UpdateAvatarInput';
import { ProfileAvatar } from '../../ProfileAvatar';

export const ProfileHeaderAvatar = ({ type, isAuth, ...props }) => {
  const srcId = useSelector(selectUserAvatarId(type));

  const [isOpen, toggleModal] = useToggle();

  return (
    <>
      <Tooltip title={`${isAuth ? 'Update' : 'View'} profile picture`} placement="right-end">
        <CircularButtonBase onClick={toggleModal}>
          <ProfileAvatar srcId={srcId} {...props} />
        </CircularButtonBase>
      </Tooltip>

      <AvatarDialog open={isOpen} onClose={toggleModal} isAuth={isAuth} avatarId={srcId} />
    </>
  );
};

// props => { open, onClose, isAuth, avatarId }
const AvatarDialog = ({ isAuth, avatarId, ...props }) => {
  return (
    <Dialog {...props}>
      {!isAuth ? (
        <CldImage srcId={avatarId} />
      ) : avatarId ? (
        <>
          <CldImage srcId={avatarId} />
          <AvatarActions />
        </>
      ) : (
        <UpdateAvatarButton />
      )}
    </Dialog>
  );
};

const AvatarActions = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={1} className={classes['avatar-actions']}>
      <Grid item>
        <UpdateAvatarIconButton />
      </Grid>
      <Grid item>
        <DeleteAvatarIconButton />
      </Grid>
    </Grid>
  );
};

const UpdateAvatarIconButton = () => {
  return (
    <IconButton>
      <UpdateIcon color="primary" />
      <UpdateAvatarInput />
    </IconButton>
  );
};

const DeleteAvatarIconButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(resetAvatar(/*id*/));

  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};

const UpdateAvatarButton = () => {
  return (
    <Button variant="contained" endIcon={<CameraIcon />}>
      Upload picture <UpdateAvatarInput />
    </Button>
  );
};
