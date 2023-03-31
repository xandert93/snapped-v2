import { Box, Card, Fade, Popover } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { userAPI } from '../../api';
import { genProfilePath } from '../../../../utils/routing-utils';
import { Link } from '../../../../components';

import { ProfileSnapshot } from './ProfileSnapshot';

import useStyles from './styles';

// props => { id, username, children }
export const ProfileLink = ({ id, username, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (e) => setAnchorEl(e.currentTarget);
  const closePopover = () => setAnchorEl(null);

  const classes = useStyles();
  return (
    <Box component="span" onMouseLeave={closePopover}>
      <Link
        to={genProfilePath(username)}
        className={classes['profile-link']}
        onMouseEnter={openPopover}
        {...props}
      />
      <ProfileSnapshotPopover id={id} anchorEl={anchorEl} />
    </Box>
  );
};

/* 
1) Previously used a <div>, but <ProfileLink> is nested in <p> for <SnapComment>, 
which would constitute bad HTML
*/

const ProfileSnapshotPopover = ({ id, anchorEl }) => {
  const isOpen = Boolean(anchorEl);

  const [snapshot, setSnapshot] = useState(null);

  const fetchSnapshot = async () => {
    const { snapshot } = await userAPI.getSnapshot(id);
    setSnapshot(snapshot);
  };

  const resetSnapshot = () => setSnapshot(null);

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(fetchSnapshot, 1200); // 1
    return () => clearTimeout(timeoutId); // 2
  }, [isOpen]);

  return (
    snapshot && (
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        //
        style={{ pointerEvents: 'none' }} // without, <Link> becomes unclickable
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        //
        TransitionProps={{ onExited: resetSnapshot }} // since <ProfileSnapshotPopover> doesn't unmount, need to manually clear `snapshot`
        TransitionComponent={Fade}
        transitionDuration={500}
        //
        PaperProps={{ component: Card }}>
        <ProfileSnapshot {...snapshot} />
      </Popover>
    )
  );
};

/*
1) client must hover link for 1.2s before fetch made
2) when client stops hover and `anchorEl` reset, isOpen => false, cancelling 
   timeout callback execution and preventing API call being made
*/

/* 
- When <ProfileLink> mounts, so does <ProfileSnapshotPopover>, but `isOpen` => false, so <ProfileSnapshotPopover> returns nothing
- When client hover over <ProfileLink>, anchor set, `isOpen` => true, fetch effect runs
- Once snapshot arrived, <Popover> returned, fading in
- Once client mouseExit either <Link> or <ProfileSnapshotPopover>, `isOpen` => false, triggering <Popover> to fade out
- To prevent violent <Popover> unmount, once exited, we `resetSnapshot`, so that next hover of same <ProfileLink> has clean slate

*/
